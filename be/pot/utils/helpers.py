from PIL import Image, ImageEnhance

from botorch.utils.transforms import unnormalize

from phashes.neuralhash.neuralhash import neuralhash
from . import constants as pot_constants


def apply_transformations_to_image(transformation_values, im, nump=False):
    """
    Apply a series of transformations to an image.

    Args:
        transformation_values (list): List containing transformation values.
        im (PIL.Image): The input image.
        nump (bool, optional): Whether transformation_values is a numpy array. Defaults to False.

    Returns:
        PIL.Image: The transformed image.
    """    
    if not nump:
        transformation_values = transformation_values.numpy()

    left, top, right, bottom, scale_factor, brightness, contrast, sharpness, color = transformation_values

    width, height = im.size
    if height == 0 or width == 0:
        print('ALERT: Image has 0 height or width')

    if left == right or top == bottom:
        print('ALERT: left == right or top == bottom')

    im = im.crop((left, top, right, bottom)).crop(im.getbbox())
    width, height = im.size
    if height > 0 and width > 0:
        if scale_factor == 0:
            print('ALERT: scale_factor == 0')

        new_width = int(width * scale_factor)
        new_height = int(height * scale_factor)

        if new_width == 0 or new_height == 0:
            print('ALERT: new_width == 0 or new_height == 0')
        else:
            im = im.resize((new_width, new_height), Image.LANCZOS)

    enhancers = [ImageEnhance.Brightness, ImageEnhance.Contrast, ImageEnhance.Sharpness, ImageEnhance.Color]
    factors = [brightness, contrast, sharpness, color]
    for enhancer, factor in zip(enhancers, factors):
        im = enhancer(im).enhance(factor)

    return im


def eval_objective(x, original_image, transformed_hash, bounds=pot_constants.BOUNDS):
    """
    Evaluate the objective function for optimization.

    Args:
        x (tensor): Input tensor representing transformation values.
        im_ (PIL.Image, optional): The input image. Defaults to im.

    Returns:
        float: The evaluation result of the objective function.
    """
    max_width, max_height = original_image.size
    bounds = bounds(max_width, max_height)
    unnormalized_x = unnormalize(x, bounds)
    x_valid = lambda x: x[0] < x[2] and x[1] < x[3]
    
    if not x_valid(unnormalized_x):
        if unnormalized_x[0] > unnormalized_x[2]:
            unnormalized_x[0], unnormalized_x[2] = unnormalized_x[2], unnormalized_x[0]
        
        if unnormalized_x[1] > unnormalized_x[3]:
            unnormalized_x[1], unnormalized_x[3] = unnormalized_x[3], unnormalized_x[1]

    applied_transformation = apply_transformations_to_image(unnormalized_x, original_image)
    temp_hash = neuralhash(applied_transformation)

    at_width, at_height = applied_transformation.size
    t_width, t_height = original_image.size

    return -hamming_distance(transformed_hash, temp_hash) - (abs(at_width - t_width) + abs(at_height - t_height)) / 1000



def hamming_distance(h1, h2):
    """
    Calculate the Hamming distance between two strings.

    Args:
        h1 (str): First string.
        h2 (str): Second string.

    Returns:
        int: The Hamming distance between the two strings.
    """
    return sum(1 for i, j in zip(h1, h2) if i != j)

