##  TLDR
Proteus is a cutting-edge content provenance system for AI-generated content on the web. It surpasses traditional image watermarking methods (digital, latent space, and deep-learning-based) by tracking and identifying content even after significant alterations like crops, screenshots, and image filters. Proteus uses perceptual hashing and proof of transformation to effectively trace content origins across the web.

## Background
## Why don't current schemes work?
Existing tracking methods for web content typically involve:

- Embedding data in the real-value domain of an image/video (e.g., watermarking pixels).
- Embedding data in the frequency domain of an image/video (e.g., DCT/DWT).
- Using neural networks to embed data into images (e.g., encoder/decoder models) - data can be encoded post-creation or during creation (e.g., watermarking in latent space by diffusion models).

Limitations include:

*Capacity*: The volume of data that can be hidden/encoded.
*Imperceptibility*: The visibility of the embedded data.
*Robustness*: The ease of corrupting embedded data.

Embedding data in visual content faces challenges due to the inherently lossy nature of images and videos, making high-capacity, imperceptible, and robust watermarking schemes difficult.

## The Proteus System
### High-level overview
For a visual explanation, look at our [system diagram](proteus.photos).

Proteus comprises three major components, each serving different entities:

*Image creation*: Run by content-producing organizations (e.g., Midjourney, DALLE, iPhone, Canon).
*Image processing*: Managed by content-consuming services (e.g., Twitter).
*Image verification*: Used by end users (e.g., Twitter users).

Process:
- Image Creation: An image is produced, and Proteus computes its perceptual hashes, along with hashes of the image after various transformations (e.g., simulated screenshots). The SHAs of each phash are stored in a public datastore.
- Background Processing: When a new image is uploaded to a platform (e.g., Twitter), Proteus identifies similar images in the datastore using perceptual hash similarity, checks the feasibility of transformations from the uploaded image to original images in the datastore, and determines the transformation sequence. These computations are stored in a verified image datastore.
- Image Verification: Users can verify the origin of an image on a platform, determining whether it was created by a content-producing organization or other means (e.g., iPhone camera).

This simple system can extend to [videos](https://github.com/zero-savvy/proven-view/), private images subject to GDPR deletion requirements, and more. 
