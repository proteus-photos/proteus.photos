from .blockhash.blockhash import blockhash
from .neuralhash.neuralhash import neuralhash
from .dinohash.dinohash import dinohash96, dinohash512

from imagehash import phash

PERCEPTUAL_HASHES = {
    "blockhash": lambda x: blockhash(x, 16),
    "neuralhash": neuralhash,
    "colourhash": lambda x: str(phash(x)),
    "dinohash96": dinohash96,
    "dinohash512": dinohash512,
}
