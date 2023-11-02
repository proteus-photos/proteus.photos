from fastapi import FastAPI, File, UploadFile
from PIL import Image
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import io

from utils import apply_phashes
from constants import ORIGINS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PerceptualHashes(BaseModel):
    blockhash: str
    neuralhash: str
    colourhash: str


@app.post("/process_image/", response_model=PerceptualHashes)
async def process_image(file: UploadFile = File(...)):
    try:
        # Read image file
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        # Apply phashes
        perceptual_hashes_for_image = apply_phashes(image)
        return perceptual_hashes_for_image
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)