from concurrent.futures import ThreadPoolExecutor

from phashes import PERCEPTUAL_HASHES


def apply_phashes(image):
    # with ThreadPoolExecutor() as executor:
    #     futures = {
    #         k: executor.submit(PERCEPTUAL_HASHES[k], image) for k in PERCEPTUAL_HASHES
    #     }

    #     results = {}
    #     for k, future in futures.items():
    #         try:
    #             results[k] = future.result()
    #         except Exception as e:
    #             results[k] = f"Error: {str(e)}"

    #     return results
    return {hash: PERCEPTUAL_HASHES[hash](image) for hash in PERCEPTUAL_HASHES}
