import { CardWithTable } from '@/components/ui/card/cardWithTable'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="font-manrope container min-h-screen mx-auto my-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold">Proteus</div>
        <nav className="flex space-x-4">
          {/* <a href="" className="hover:text-gray-600 text-lg underline">Github</a> */}
          <a href="mailto:danielbess16@gmail.com" className="hover:text-gray-600 text-lg underline">Work with us</a>
        </nav>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full mt-16 px-4">
          <div className="container mx-auto pr-4 sm:pr-6 lg:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text" style={{ lineHeight: '1.25' }}>Next generation</h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text" style={{ lineHeight: '1.25' }}>content provenance</h1>
            <p className="text-lg sm:text-xl mt-6 mb-8 leading-relaxed pb-2">Proteus is an open-source platform for AI content provenance - leveraging proof of transformation to create incorruptible and robust watermarks.</p>
          </div>
          <div className="flex flex-wrap -mb-4">
            <a target="_blank" rel="noopener noreferrer" href="http://morpheus.hackgrants.com" className="mb-4 text-xl bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-800 w-full sm:w-auto mr-4">Project outline</a>
            <Link href="#perceptual-hashes-section" className="mb-4 text-xl border border-green-500 text-green-600 py-2 px-6 rounded hover:bg-green-100 w-full sm:w-auto mr-4">Try our playground</Link>
            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=OF0S5IVN-UE" className="mb-4 text-xl border border-yellow-500 text-yellow-600 py-2 px-6 rounded hover:bg-yellow-100 w-full sm:w-auto mr-4">Watch 5 min talk</a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=DopakmTZwXg" className="mb-4 text-xl border border-orange-500 text-orange-600 py-2 px-6 rounded hover:bg-orange-100 w-full sm:w-auto mr-4">Watch 30 min talk</a>
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
