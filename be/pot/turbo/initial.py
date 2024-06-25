import numpy as np
import torch


def get_initial_points(n_init, seed=0):
    """
    Generate initial points for the optimization process. Constrains initial points to a reasonable range.
    """
    # TODO: m1/m2 osx    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    # Generate values between 0 and 0.25 for left and top, and between 0.5 and 1 for right and bottom using numpy
    # Left, top, right, bottom
    first = np.random.uniform(0, 0.25, size=(n_init, 1))
    second = np.random.uniform(0, 0.25, size=(n_init, 1))
    third = np.random.uniform(0.75, 1, size=(n_init, 1))
    fourth = np.random.uniform(0.75, 1, size=(n_init, 1))
    fifth = np.ones((n_init, 1))
    sixth = np.ones((n_init, 1))
    seventh = np.ones((n_init, 1))
    eigth = np.ones((n_init, 1))
    ninth = np.ones((n_init, 1))

    # Concatenate the arrays horizontally
    arr = np.hstack((first, second, third, fourth, fifth, sixth, seventh, eigth, ninth))
    # Convert the NumPy array to a torch tensor
    X_init = torch.tensor(arr, dtype=torch.double, device=device)

    return X_init
