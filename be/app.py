import logging

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageFile
from dataclasses import dataclass
import io

from utils import apply_phashes

# https://github.com/python-pillow/Pillow/issues/1510
ImageFile.LOAD_TRUNCATED_IMAGES = True

app = Flask(__name__)
CORS(app)


@dataclass
class PerceptualHashes:
    blockhash: str
    neuralhash: str
    colourhash: str
    dinohash: str


@app.route("/process_image", methods=["POST"])
def process_image():
    if "file" not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify(error="No selected file"), 400
    if file:
        try:
            image_data = file.read()
            image = Image.open(io.BytesIO(image_data))
            hashes = apply_phashes(image)
            # Validate output with dataclass
            perceptual_hashes_for_image = PerceptualHashes(**hashes)
            return jsonify(perceptual_hashes_for_image.__dict__)
        except Exception as e:
            return jsonify(error=str(e)), 400


if __name__ == "__main__":
    app.run(debug=True)
