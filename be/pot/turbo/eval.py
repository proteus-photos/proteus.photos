import torch
import os
from torch.quasirandom import SobolEngine

from botorch.models import SingleTaskGP
from botorch.generation import MaxPosteriorSampling
from botorch.fit import fit_gpytorch_mll

import gpytorch
from gpytorch.kernels import MaternKernel, ScaleKernel
from gpytorch.likelihoods import GaussianLikelihood
from gpytorch.constraints import Interval
from gpytorch.mlls import ExactMarginalLogLikelihood

import pot.utils.constants as pot_constants

from .initial import get_initial_points
from ..utils.helpers import eval_objective
from .state import TurboState, update_state


SMOKE_TEST = os.environ.get("SMOKE_TEST")


def generate_batch(
    state,
    model,  # GP model
    X,  # Evaluated points on the domain [0, 1]^d
    Y,  # Function values
    batch_size,
    n_candidates=None,  # Number of candidates for Thompson sampling
    num_restarts=10,
    raw_samples=512,
    acqf="ts",  # "ei" or "ts"
):
    assert acqf in ("ts", "ei")
    assert X.min() >= 0.0 and X.max() <= 1.0 and torch.all(torch.isfinite(Y))
    if n_candidates is None:
        n_candidates = min(5000, max(2000, 200 * X.shape[-1]))


    device = X.device
    # Scale the TR to be proportional to the lengthscales
    x_center = X[Y.argmax(), :].clone()
    weights = model.covar_module.base_kernel.lengthscale.squeeze().detach()
    weights = weights / weights.mean()
    weights = weights / torch.prod(weights.pow(1.0 / len(weights)))
    tr_lb = torch.clamp(x_center - weights * state.length / 2.0, 0.0, 1.0)
    tr_ub = torch.clamp(x_center + weights * state.length / 2.0, 0.0, 1.0)

    if acqf == "ts":
        dim = X.shape[-1]
        sobol = SobolEngine(dim, scramble=True)
        pert = sobol.draw(n_candidates).to(dtype=torch.double, device=device)
        pert = tr_lb + (tr_ub - tr_lb) * pert

        # Create a perturbation mask
        prob_perturb = min(20.0 / dim, 1.0)
        mask = (
            torch.rand(n_candidates, dim, dtype=torch.double, device=device)
            <= prob_perturb
        )
        ind = torch.where(mask.sum(dim=1) == 0)[0]
        mask[ind, torch.randint(0, dim - 1, size=(len(ind),), device=device)] = 1

        # Create candidate points from the perturbations and the mask        
        X_cand = x_center.expand(n_candidates, dim).clone()
        X_cand[mask] = pert[mask]

        # Sample on the candidate points
        thompson_sampling = MaxPosteriorSampling(model=model, replacement=False)
        with torch.no_grad():  # We don't need gradients when using TS
            X_next = thompson_sampling(X_cand, num_samples=batch_size)

    elif acqf == "ei":
        # ei = qExpectedImprovement(model, train_Y.max(), maximize=True)
        # X_next, acq_value = optimize_acqf(
        #     ei,
        #     bounds=torch.stack([tr_lb, tr_ub]),
        #     q=batch_size,
        #     num_restarts=num_restarts,
        #     raw_samples=raw_samples,
        # )
        pass

    return X_next


def run_eval(
        original_image, 
        transformed_hash,
        eval_ = eval_objective, 
        dim=pot_constants.DIM,
        n_init=pot_constants.N_INIT, 
        batch_size=pot_constants.BATCH_SIZE, 
        max_cholesky_size=pot_constants.MAX_CHOLESKY_SIZE
):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    dim, n_init = pot_constants.DIM, pot_constants.N_INIT
    dtype = torch.double
    X_turbo = get_initial_points(dim, n_init)
    Y_turbo = torch.tensor(
        [eval_(x, original_image=original_image, transformed_hash=transformed_hash) for x in X_turbo], dtype=dtype, device=device
    )
    # Unsqueeze Y_turbo to have shape (dim, 1)
    Y_turbo = Y_turbo.unsqueeze(-1)

    # If all of the values in Y_turbo are the same, add a random row to X_turbo and recompute Y_turbo
    if Y_turbo.std() == 0:
        print("Having to add random values:")
        random = torch.rand(1, dim, dtype=dtype, device=device)
        X_turbo = torch.cat((X_turbo, random), 0)
        Y_turbo = torch.tensor(
            [eval_(x, original_image=original_image, transformed_hash=transformed_hash) for x in X_turbo], dtype=dtype, device=device
        )
        # Unsqueeze Y_turbo to have shape (dim, 1)
        Y_turbo = Y_turbo.unsqueeze(-1)     

    print(f"Y_turbo pre-running: {Y_turbo}")

    state = TurboState(dim, batch_size=batch_size)

    NUM_RESTARTS = 1000 if not SMOKE_TEST else 2
    RAW_SAMPLES = 512 if not SMOKE_TEST else 4
    N_CANDIDATES = min(5000, max(2000, 200 * dim)) if not SMOKE_TEST else 4

    while not state.restart_triggered:  # Run until TuRBO converges
        # Fit a GP model
        # If Y_turbo.std() is 0, then we need to add a small amount of noise to the targets

        train_Y = (Y_turbo - Y_turbo.mean()) / Y_turbo.std()
        
        likelihood = GaussianLikelihood(noise_constraint=Interval(1e-8, 1e-3))
        covar_module = ScaleKernel(  # Use the same lengthscale prior as in the TuRBO paper
            MaternKernel(nu=2.5, ard_num_dims=dim, lengthscale_constraint=Interval(0.005, 4.0))
        )
        model = SingleTaskGP(X_turbo, train_Y, covar_module=covar_module, likelihood=likelihood)
        mll = ExactMarginalLogLikelihood(model.likelihood, model)

        # Do the fitting and acquisition function optimization inside the Cholesky context
        with gpytorch.settings.max_cholesky_size(max_cholesky_size):
            # Fit the model
            fit_gpytorch_mll(mll)
        
            # Create a batch
            X_next = generate_batch(
                state=state,
                model=model,
                X=X_turbo,
                Y=train_Y,
                batch_size=batch_size,
                n_candidates=N_CANDIDATES,
                num_restarts=NUM_RESTARTS,
                raw_samples=RAW_SAMPLES,
                acqf="ts",
            )

        Y_next = torch.tensor(
            [eval_(x, original_image=original_image, transformed_hash=transformed_hash) for x in X_next], dtype=dtype, device=device
        ).unsqueeze(-1)

        # Update state
        state = update_state(state=state, Y_next=Y_next)

        # Append data
        X_turbo = torch.cat((X_turbo, X_next), dim=0)
        Y_turbo = torch.cat((Y_turbo, Y_next), dim=0)
        # Print current status
        print(
            f"{len(X_turbo)}) Best value: {state.best_value}, TR length: {state.length:.2e}, "
        )

    return X_turbo, state.best_value
