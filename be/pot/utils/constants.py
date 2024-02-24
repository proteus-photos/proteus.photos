import torch


MAX_SCALING = 4
MIN_SCALING = 0.5
MAX_BRIGTHNESS = 2
MIN_BRIGTHNESS = 0.5
MAX_CONTRAST = 2
MIN_CONTRAST = 0.5
MAX_SHARPNESS = 2
MIN_SHARPNESS = 0.5
MAX_COLOR = 5
MIN_COLOR = 0.5
# length of input vector (i.e. x, y, w, h, scaling, brightness, contrast, sharpness, color)
# can be expanded with an arbitrary number of parameters/functions (i.e. 0/1 jpeg, 0/1 {compression}, % blur)
DIM = 9
N_INIT = 2 * DIM
BATCH_SIZE = 4
MAX_CHOLESKY_SIZE = float("inf")
# Note: this is useful to constrain starting conditions to only reasonable values
BOUNDS = lambda MAX_WIDTH, MAX_HEIGHT: torch.tensor(
    [
        [0, 0, MAX_WIDTH * 0.5, MAX_HEIGHT * .5, MIN_SCALING, MIN_BRIGTHNESS, MIN_CONTRAST, MIN_SHARPNESS, MIN_COLOR],
        [MAX_WIDTH * .5, MAX_HEIGHT * .5, MAX_WIDTH, MAX_HEIGHT, MAX_SCALING, MAX_BRIGTHNESS, MAX_CONTRAST, MAX_SHARPNESS, MAX_COLOR]
    ]
)