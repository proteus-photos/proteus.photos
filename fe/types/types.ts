
export type PerceptualHash = "blockhash" | "neuralhash" | "colourhash" | "dinohash96" | "dinohash512"

export type PerceptualHashResponse = Record<PerceptualHash, string>