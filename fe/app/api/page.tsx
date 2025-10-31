import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference - Proteus',
  description: 'Complete API reference for Proteus DinoHash image deduplication library.',
}

export default function APIPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">
          API Reference
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Installation</h2>
            <p className="text-gray-700 mb-4">
              Install DinoHash via npm:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-4">
              <code>npm install @proteus-labs/dinohash</code>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Package links:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><a href="https://www.npmjs.com/package/@proteus-labs/dinohash" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">npm package</a></li>
              <li><a href="https://github.com/proteus-photos/dinohash-perceptual-hash" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">GitHub repository</a></li>
              <li><a href="https://huggingface.co/backslashh/DINOHash" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Hugging Face model</a></li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">JavaScript/TypeScript Usage</h2>
            <p className="text-gray-700 mb-4">
              Use DinoHash in your JavaScript or TypeScript projects. The package uses ONNX Runtime for inference.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Basic Usage</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-4">
                <pre>{`const { downloadModel, loadModel, hash } = require('@proteus-labs/dinohash');
const path = require('path');

async function main() {
  // Download the model from Hugging Face
  const modelUrl = 'https://huggingface.co/backslashh/DINOHash/resolve/main/dinov2_vits14_reg_96bit_dynamic.onnx';
  const modelPath = path.join(__dirname, './models/dinov2_vits14_reg_96bit.onnx');
  
  // Download and load the model
  await downloadModel(modelUrl, modelPath);
  const session = await loadModel(modelPath, 'cpu'); // Use 'cuda' for GPU inference if available
  
  // Hash images
  const imagePaths = [
    path.join(__dirname, 'image1.jpg'),
    path.join(__dirname, 'image2.jpg')
  ];
  
  const results = await hash(session, imagePaths);
  console.log(results);
}

main();`}</pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Using ES Modules</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-4">
                <pre>{`import { downloadModel, loadModel, hash } from '@proteus-labs/dinohash';
import path from 'path';

const modelUrl = 'https://huggingface.co/backslashh/DINOHash/resolve/main/dinov2_vits14_reg_96bit_dynamic.onnx';
const modelPath = path.join(process.cwd(), './models/dinov2_vits14_reg_96bit.onnx');

await downloadModel(modelUrl, modelPath);
const session = await loadModel(modelPath, 'cpu');
const hashes = await hash(session, ['image1.jpg', 'image2.jpg']);`}</pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">API Functions</h2>
            
            <div className="mb-8 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">downloadModel(modelUrl, modelPath)</h3>
              <p className="text-gray-700 mb-4">
                Download the ONNX model from Hugging Face to a local path.
              </p>
              
              <h4 className="font-semibold mb-2">Parameters</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li><code>modelUrl</code> (string): URL to the ONNX model file (e.g., from Hugging Face)</li>
                <li><code>modelPath</code> (string): Local file path where the model should be saved</li>
              </ul>
              
              <h4 className="font-semibold mb-2">Returns</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <code>Promise&lt;void&gt;</code> - Resolves when download completes
              </div>
            </div>

            <div className="mb-8 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">loadModel(modelPath, provider)</h3>
              <p className="text-gray-700 mb-4">
                Load the ONNX model for inference.
              </p>
              
              <h4 className="font-semibold mb-2">Parameters</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li><code>modelPath</code> (string): Path to the downloaded ONNX model file</li>
                <li><code>provider</code> (string): Inference provider - &apos;cpu&apos; or &apos;cuda&apos; (for GPU)</li>
              </ul>
              
              <h4 className="font-semibold mb-2">Returns</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <code>Promise&lt;InferenceSession&gt;</code> - ONNX Runtime inference session
              </div>
            </div>

            <div className="mb-8 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">hash(session, imagePaths)</h3>
              <p className="text-gray-700 mb-4">
                Generate perceptual hashes for one or more images using the loaded model session.
              </p>
              
              <h4 className="font-semibold mb-2">Parameters</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                <li><code>session</code> (InferenceSession): The loaded ONNX model session</li>
                <li><code>imagePaths</code> (string | string[]): Single image path or array of image paths</li>
              </ul>
              
              <h4 className="font-semibold mb-2">Returns</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <code>Promise&lt;string | string[]&gt;</code> - Hash string(s) for the input image(s)
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Hugging Face Model</h2>
            <p className="text-gray-700 mb-4">
              The DinoHash model is hosted on Hugging Face:
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-blue-800">
                <strong>Model:</strong> <a href="https://huggingface.co/backslashh/DINOHash" target="_blank" rel="noopener noreferrer" className="underline">backslashh/DINOHash</a>
              </p>
              <p className="text-blue-800 mt-2">
                <strong>License:</strong> MIT
              </p>
              <p className="text-blue-800 mt-2">
                <strong>Model Type:</strong> Image Feature Extraction (ONNX)
              </p>
              <p className="text-blue-800 mt-2">
                <strong>Architecture:</strong> DINOv2 ViT-S/14
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Model File</h3>
              <p className="text-gray-700 mb-2">
                The ONNX model file can be downloaded directly:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-4">
                <code className="text-sm break-all">
                  https://huggingface.co/backslashh/DINOHash/resolve/main/dinov2_vits14_reg_96bit_dynamic.onnx
                </code>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Complete Example</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-4">
              <pre>{`const { downloadModel, loadModel, hash } = require('@proteus-labs/dinohash');
const path = require('path');
const fs = require('fs');

async function hashImages(imagePaths) {
  // Ensure models directory exists
  const modelsDir = path.join(__dirname, 'models');
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }
  
  // Model configuration
  const modelUrl = 'https://huggingface.co/backslashh/DINOHash/resolve/main/dinov2_vits14_reg_96bit_dynamic.onnx';
  const modelPath = path.join(modelsDir, 'dinov2_vits14_reg_96bit.onnx');
  
  // Download model if not already present
  if (!fs.existsSync(modelPath)) {
    console.log('Downloading model...');
    await downloadModel(modelUrl, modelPath);
  }
  
  // Load model (use 'cuda' for GPU if available)
  const session = await loadModel(modelPath, 'cpu');
  
  // Generate hashes
  const hashes = await hash(session, imagePaths);
  
  return hashes;
}

// Usage
hashImages(['image1.jpg', 'image2.jpg'])
  .then(hashes => {
    console.log('Hashes:', hashes);
    // Compare hashes (hamming distance)
    if (hashes.length === 2) {
      const similarity = compareHashes(hashes[0], hashes[1]);
      console.log('Similarity:', similarity);
    }
  })
  .catch(console.error);

function compareHashes(hash1, hash2) {
  // Simple hamming distance comparison
  let distance = 0;
  for (let i = 0; i < Math.min(hash1.length, hash2.length); i++) {
    if (hash1[i] !== hash2[i]) distance++;
  }
  return 1 - (distance / Math.max(hash1.length, hash2.length));
}`}</pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">NPM Package</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Install and use DinoHash in your JavaScript/TypeScript projects
                </p>
                <a 
                  href="https://www.npmjs.com/package/@proteus-labs/dinohash" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-sm font-medium"
                >
                  View on npm →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">GitHub Repository</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Source code and documentation
                </p>
                <a 
                  href="https://github.com/proteus-photos/dinohash-perceptual-hash" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-sm font-medium"
                >
                  View on GitHub →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Hugging Face Model</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Use the model directly from Hugging Face Hub
                </p>
                <a 
                  href="https://huggingface.co/backslashh/DINOHash" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-sm font-medium"
                >
                  View on Hugging Face →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Homepage</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Learn more about Proteus
                </p>
                <a 
                  href="https://www.proteus.photos/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-sm font-medium"
                >
                  Visit proteus.photos →
                </a>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Check out our <a href="/docs" className="text-pink-600 hover:underline">documentation</a> or 
              <a href="mailto:aayushg@mit.edu" className="text-pink-600 hover:underline"> contact us</a> for 
              support and custom integrations.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}