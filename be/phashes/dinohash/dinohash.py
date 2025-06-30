import sys
import onnxruntime
import numpy as np
from PIL import Image
import os

session96 = onnxruntime.InferenceSession("./phashes/dinohash/dinov2_vits14_reg_96bit.onnx")
session512 = onnxruntime.InferenceSession("./phashes/dinohash/dinov2_vitb14_reg_512bit.onnx")

mean = np.array([0.485, 0.456, 0.406]).astype(np.float32)
std = np.array([0.229, 0.224, 0.225]).astype(np.float32)

def dinohash(im, mode=96):
    image = im.convert("RGB")
    image = image.resize([224, 224])
    arr = np.array(image).astype(np.float32) / 255.0
    arr = (arr - mean) / std
    arr = arr.transpose(2, 0, 1).reshape([1, 3, 224, 224])

    # Run model
    session = session96 if mode == 96 else session512
    inputs = {session.get_inputs()[0].name: arr}
    outs = session.run(None, inputs)

    # Convert model output to hex hash
    hash_output = outs[0].flatten()
    hash_bits = "".join(["1" if it >= 0 else "0" for it in hash_output])
    hash_hex = "{:0{}x}".format(int(hash_bits, 2), len(hash_bits) // 4)

    return hash_hex

dinohash96 = lambda im: dinohash(im, mode=96)
dinohash512 = lambda im: dinohash(im, mode=512)