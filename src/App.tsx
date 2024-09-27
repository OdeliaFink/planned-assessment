import './App.css'
import { CubeIcon } from '@heroicons/react/20/solid'
import DescriptionTextArea from './components/DescriptionTextArea'
import MemoryList from './components/MemoryList'
import SharingButton from './components/buttons/SharingButton'

function App() {
  return (
    <div className='flex bg-orange-50 min-h-screen'>
      <div className='flex-shrink-0 p-2  pt-5 border-r border-gray-300'>
        <CubeIcon className='h-12 w-12 inline-block' />
      </div>
      <div className='flex-grow flex flex-col justify-between overflow-hidden'>
        <div>
          <div className='sm:px-12 px-10'>
            <div className='px-3 py-3 pt-5 flex justify-between'>
              <h1 className='font-regular text-2xl tracking-tighter'>
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
