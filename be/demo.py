import os 
import psutil 

from PIL import Image
from multiprocessing import Pool, cpu_count

import pot.utils.constants as pot_constants
from pot.turbo.state import TurboState
from pot.turbo.eval import run_eval
from phashes.neuralhash.neuralhash import neuralhash


def parallel_run_eval(args):
    original_image, transformed_hash = args
    pid = os.getpid()  # Get the current process ID
    p = psutil.Process(pid)
    print(f"Process ID: {pid}")
    run_eval(original_image, transformed_hash)


if __name__ == "__main__":
    state = TurboState(dim=pot_constants.DIM, batch_size=pot_constants.BATCH_SIZE)
    original_image = Image.open('./pot/assets/chimp.png')
    transformed_image = Image.open('./pot/assets/chimp_cropped_screenshot.png')
    transformed_hash = neuralhash(transformed_image)

    # Note: can run seperate processes in parallel as opt isnt' deterministic    
    # args_list = [(original_image, transformed_hash) for _ in range(cpu_count())]
    # with Pool(cpu_count()) as pool:
    #     # Goal is to go from original image to 
    #     pool.map(parallel_run_eval, args_list)

    run_eval(original_image, transformed_hash)
