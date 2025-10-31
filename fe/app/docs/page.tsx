import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Documentation - Proteus',
  description: 'Learn how to use Proteus for image deduplication and provenance verification.',
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">
          Documentation
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-700 mb-4">
              Proteus provides powerful image deduplication and provenance verification through perceptual hashing. 
              Get started in minutes with our API or npm package.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-3">Quick Start</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <code>{`npm install @proteus-labs/dinohash

import { hashImage } from '@proteus-labs/dinohash';

const hash = await hashImage(imageBlob);
console.log(hash);`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="text-gray-700 mb-4">
              Proteus uses DinoHash, a perceptual hashing algorithm that generates robust fingerprints 
              for images. These hashes remain consistent even when images are transformed (cropped, 
              filtered, compressed, etc.), making them ideal for deduplication.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Key Feature:</strong> DinoHash achieves 12% higher bit accuracy than 
                state-of-the-art methods and is robust to common image transformations.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">hashImage(image: Blob | File | ArrayBuffer)</h3>
              <p className="text-gray-700 mb-2">
                Generate a perceptual hash for an image.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <code>hashImage(imageBlob) → Promise&lt;string&gt;</code>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">compareHashes(hash1: string, hash2: string)</h3>
              <p className="text-gray-700 mb-2">
                Compare two hashes and return similarity score (0-1).
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <code>compareHashes(hash1, hash2) → number</code>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Image Deduplication:</strong> Remove near-duplicate images from datasets</li>
              <li><strong>Content Moderation:</strong> Detect previously flagged content</li>
              <li><strong>Provenance Tracking:</strong> Verify image origin and transformations</li>
              <li><strong>Copyright Protection:</strong> Identify unauthorized copies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Performance</h2>
            <p className="text-gray-700 mb-4">
              Proteus offers multiple model sizes optimized for different use cases:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Fast:</strong> ResNet-based models for real-time processing</li>
              <li><strong>Balanced:</strong> Medium-sized models for batch processing</li>
              <li><strong>Robust:</strong> DinoV2-based models for maximum accuracy</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Performance Trade-offs</h2>
            <p className="text-gray-700 mb-4">
              We retrained the perceptual hashing head on multiple backbones of different models and hash sizes to trace the Pareto frontier between robustness and efficiency. This table shows evaluation time on 12 CPUs and different student-teacher distillations as backbones. Smaller backbones (e.g., Resnets) are faster and lighter for real-time use, while larger backbones (e.g., DinoV2) deliver higher robustness to edits at higher compute cost. The plot below summarizes the trade-off. Feel free to <a href="mailto:aayushg@mit.edu" className="text-pink-600 hover:underline">contact us</a> if you want access to other ProteusHash models on the Pareto frontier.
            </p>
            <Image src="/paretofront.jpg" alt="Pareto frontier across backbones and hash sizes" width={1200} height={600} className="w-full rounded-lg border border-gray-200 shadow-sm" />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
            <p className="text-gray-700 mb-4">
              Proteus can be deployed in multiple ways to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>API:</strong> Cloud-hosted service with encrypted requests</li>
              <li><strong>On-Prem:</strong> Self-hosted deployment for maximum privacy</li>
              <li><strong>MPC/FHE:</strong> Privacy-preserving queries using multi-party computation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Check out our <a href="/api" className="text-pink-600 hover:underline">API documentation</a> or 
              <a href="mailto:aayushg@mit.edu" className="text-pink-600 hover:underline"> contact us</a> for 
              enterprise support and custom deployments.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
