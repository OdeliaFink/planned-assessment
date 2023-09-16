import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import DescriptionTextArea from './components/DescriptionTextArea'
import SharingButton from './components/buttons/SharingButton'
import MemoryList from './components/MemoryList'

function App() {
  return (
    <div className='flex bg-gray-100 h-full'>
      <div className='flex-shrink-0 p-2  pt-5 border-r border-gray-300'>
        <CubeIcon className='h-12 w-12 inline-block' />
      </div>
      <div className='flex-grow flex flex-col justify-between'>
        <div>
          <div className='px-8'>
            <div className='px-4 py-6 pt-12 flex justify-between'>
              <h1 className='font-semibold text-4xl tracking-tighter'>
                odelia's memory lane
              </h1>
              <SharingButton />
            </div>
            <DescriptionTextArea />
          </div>
          <MemoryList />
        </div>
      </div>
    </div>
  )
}

export default App
