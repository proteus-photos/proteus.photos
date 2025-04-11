import { CardWithTable } from '@/components/ui/card/cardWithTable'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="font-manrope container min-h-screen mx-auto my-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold">Proteus</div>
        <nav className="flex space-x-4">
          {/* <a href="" className="hover:text-gray-600 text-lg underline">Github</a> */}
          <a href="mailto:aayushg@mit.edu" className="hover:text-gray-600 text-lg underline">Work with us</a>
        </nav>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full mt-16 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text" style={{ lineHeight: '1.25' }}>Next generation</h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text" style={{ lineHeight: '1.25' }}>content provenance</h1>
          <p className="text-lg sm:text-xl mt-6 mb-8 leading-relaxed pb-2">Proteus is an open-source platform for AI content provenance, leveraging perceptual hashing, digital signatures, and MPC/FHE to create incorruptible, private, and robust watermarks.</p>
          
          <div className="mt-4 mb-8">
            <h3 className="text-xl font-semibold mb-3">Key Innovations</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>DinoHash: Perceptual hashing algorithm robust to common image transformations like filters, compression and crops. Algorithm achieves 12% higher bit accuracy than state-of-the-art methods. Perceptual hash values are signed by the content generator, establishing provenance.</li>
              <li>Privacy-Preserving Queries: Multi-Party Fully Homomorphic Encryption to map image provenance, keeps both user queries and registry data private, with a fallback to MPC if the database is too large.</li>
              <li>Failsafe Detection: Backup classifier identifies synthetic images not found in the registry with state of the art accuracy, showing 25% better classification accuracy on real-world AI generators.</li>
              <li>Adversarial Defense: Protection against both hash collision and hash aversion attacks, that limit the attack surface wherein an attacker cannot modify the provenance without visually changing the image.</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap">
            <a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2503.11195" className="mb-4 text-xl bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-800 w-full sm:w-auto mr-4">Read our paper</a>
            <a target="_blank" rel="noopener noreferrer" href="https://proteusphotos.notion.site/Proteus-V2-Transformation-Resistant-AI-Image-Watermarking-2fae4336b9534e6ab4410003461a2811" className="mb-4 text-xl bg-white-500 text-blue-500 border border-blue-500 py-2 px-6 rounded hover:bg-blue-800 w-full sm:w-auto mr-4">Read our blog post</a>
            <Link href="#perceptual-hashes-section" className="mb-4 text-xl border border-green-500 text-green-600 py-2 px-6 rounded hover:bg-green-100 w-full sm:w-auto mr-4">Try our playground</Link>
            <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/b45hakfN1cM?t=9234" className="mb-4 text-xl border border-yellow-500 text-yellow-600 py-2 px-6 rounded hover:bg-yellow-100 w-full sm:w-auto mr-4">Watch 10 min talk</a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/proteus-photos" className="mb-4 text-xl border border-gray-500 text-gray-600 py-2 px-6 rounded hover:bg-gray-100 w-full sm:w-auto mr-4">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
                GitHub
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="divider my-10"></div>
      <div className='flex flex-wrap -mx-4'>
        <div className="w-full mt-24 px-4">
          <h1 className="text-4xl font-bold mb-6 text-black bg-clip-text">How does it work?</h1>
          <iframe
            className="border border-opacity-10"
            width="100%"
            height="450"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FiMlCZEIUktgXBWtHWPN3J2%2FUntitled%3Ftype%3Dwhiteboard%26node-id%3D0%253A1%26t%3DivbdSEsSvyzC9S6G-1"
            allowFullScreen
          />
          <h1 id="perceptual-hashes-section" className="text-4xl font-bold mb-6 text-black bg-clip-text mt-16">What are perceptual hashes?</h1>
          <p className="text-lg mb-4">
            Upload an original image and its edited version to compare their perceptual hashes. This will help you understand how closely the hashes match, indicating the degree of similarity between the two images.
          </p>
          <div className="flex flex-row items-center justify-center mb-4 space-x-4">
            <CardWithTable text="Drag and drop an image below!" />
            <CardWithTable text="Drag and drop a modified image below!" />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home
