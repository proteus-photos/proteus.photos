import { CardWithTable } from '@/components/ui/card/cardWithTable'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="font-manrope container min-h-screen mx-auto my-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold">Morpheus</div>
        <nav className="flex space-x-4">
          {/* <a href="" className="hover:text-gray-600 text-lg underline">Github</a> */}
          <a href="mailto:danielbess16@gmail.com" className="hover:text-gray-600 text-lg underline">Work with us</a>
        </nav>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full mt-16 px-4">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">Next generation<br />content provenance</h1>
          <p className="text-xl mb-8 leading-8">Morpheus is an open-source platform for AI content provenance - leveraging proof of transformation to create incorruptible and robust watermarks. </p>
          <div className="flex space-x-4">
            <a target="_blank" rel="noopener noreferrer" href="http://morpheus.hackgrants.com" className="text-xl bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600">Project outline</a>
            <Link href="#perceptual-hashes-section" className="text-xl border border-gray-500 text-gray-600 py-2 px-6 rounded hover:bg-gray-100">Try our playground</Link>
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
          <div className="flex flex-row items-center justify-center mb-4 space-x-4">
            <CardWithTable />
            <CardWithTable />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home
