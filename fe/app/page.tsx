'use client';

import { CardWithTable } from '@/components/ui/card/cardWithTable'
import Link from 'next/link'
import Image from 'next/image'
import { PerceptualHashResponse } from '@/types/types'
import React, { useState } from 'react'

const Home = () => {
  const [image1Data, setImage1Data] = useState<PerceptualHashResponse | null>(null)
  const [image2Data, setImage2Data] = useState<PerceptualHashResponse | null>(null)

  const handleImage1Processed = (data: PerceptualHashResponse | null) => {
    setImage1Data(data)
    console.log("image1Data", image1Data, "data", data)
  }

  const handleImage2Processed = (data: PerceptualHashResponse | null) => {
    setImage2Data(data)
    console.log("image2Data", image2Data, "data", data)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text leading-tight">
            Image deduplication
            <br />
            for AI and social platforms
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We&apos;re working with large pretraining and social network teams. We flag near-duplicate images across massive datasets and real-time streams, and inform if images are AI generated or not.
          </p>
          <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
            In the deepfake age, images can be instantly copied, edited, and weaponized. Provenance is how platforms verify where content came from and what changed along the way—reducing misinformation, protecting creators, and enforcing policy at scale. Proteus brings practical provenance and deduplication to production without exposing user data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Proteus?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fast, private perceptual hashing with robust matching — deploy via API, batch, or on‑prem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process millions of images per hour with our optimized models. Real-time deduplication for streaming workloads, optimized on both CPU and GPU.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adversarially Robust</h3>
              <p className="text-gray-600">Built to withstand attacks. Made for provenance across all social media platforms.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">State of the Art</h3>
              <p className="text-gray-600">12% higher accuracy than state-of-the-art closed-source image matching systems (Apple&apos;s NeuralHash). Resistant to filters, compression, crops, and transformations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 id="perceptual-hashes-section" className="text-4xl font-bold mb-4 text-center">Try It Yourself</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Upload an original image and its edited version to compare their perceptual hashes, including our DinoHash algorithm and previous algorithms. This will help you understand how closely the hashes match, indicating the degree of similarity between the two images.
            </p>
            <div className="flex flex-col lg:flex-row items-start justify-center mb-4 gap-6">
              <CardWithTable 
                text="Upload original image" 
                onImageProcessed={handleImage1Processed}
                comparisonData={image2Data}
              />
              <CardWithTable 
                text="Upload modified image" 
                onImageProcessed={handleImage2Processed}
                comparisonData={image1Data}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">Research</h2>
            <p className="text-lg text-gray-700 mb-8">
              Proteus is an open-source platform for AI content provenance, leveraging perceptual hashing, digital signatures, and MPC/FHE to create incorruptible, private, and robust watermarks. The <a href="https://icml.cc/virtual/2025/48181" className="text-pink-600 hover:underline">Proteus paper was presented at ICML 2025</a> at the CODEML Workshop. The Dinohash perceptual hashing algorithm can be used independently of the Proteus system.
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <h3 className="text-2xl font-semibold mb-4">Key Innovations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span><strong>DinoHash:</strong> Perceptual hashing algorithm robust to common image transformations like filters, compression and crops. Algorithm achieves 12% higher bit accuracy than state-of-the-art methods.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span><strong>Provenance Verification:</strong> Perceptual hash values are signed by the content generator, establishing provenance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span><strong>Privacy-Preserving Queries:</strong> Multi-Party Fully Homomorphic Encryption to map image provenance, keeps both user queries and registry data private, with a fallback to MPC if the database is too large.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span><strong>Failsafe Detection:</strong> Backup classifier identifies synthetic images not found in the registry with state of the art accuracy, showing 25% better classification accuracy on real-world AI generators.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span><strong>Adversarial Defense:</strong> DinoHash is adversarially trained against both hash collision and hash aversion attacks, that limit the attack surface wherein an attacker cannot modify the provenance without visually changing the image.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <a target="_blank" rel="noopener noreferrer" href="https://openreview.net/pdf?id=HrGa8Mq2NE" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Read ICML DinoHash Paper
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2503.11195" className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Read System Paper
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://proteusphotos.notion.site/Proteus-V2-Transformation-Resistant-AI-Image-Watermarking-2fae4336b9534e6ab4410003461a2811" className="px-6 py-3 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors font-medium">
                Read Blog Post
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/b45hakfN1cM?t=9234" className="px-6 py-3 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-medium">
                Watch 10 Min Talk
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/proteus-photos" className="px-6 py-3 border-2 border-gray-500 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
                Code
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/@proteus-labs/dinohash" className="px-6 py-3 border-2 border-gray-500 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center">
                <Image src="/npm.svg" width={20} height={20} className="mr-2" alt="npm logo" />
                npm
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join large pretraining and image verification teams using Proteus for image deduplication.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-4 bg-white text-pink-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home