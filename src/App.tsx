import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import PostedCard from './components/MemoryCard'
import DescriptionTextArea from './components/DescriptionTextArea'
import SortingButton from './components/buttons/SortingButton'
import SharingButton from './components/buttons/SharingButton'
import AddMemoryModal from './components/AddMemoryModal'
import img1 from './assets/img1.jpg'
import MemoryList from './components/MemoryList'

function App() {
  // const addMemory = (title: string, description: string) => {
  //   const currentDate = new Date().toLocaleString()
  //   setMemories([...memories, { title, description, date: currentDate }])
  // }

  return (
    <div className='flex bg-gray-100 h-screen'>
      <div className='flex-shrink-0 p-2  pt-5 border-r border-gray-300'>
        <CubeIcon className='h-12 w-12 inline-block' />
      </div>
      <div className='flex-grow flex flex-col justify-beteween'>
        <div className='px-10'>
          <div className='px-3 py-6 pt-12 flex justify-between'>
            <h1 className='font-semibold text-4xl tracking-wide'>
              odelia's memory lane
            </h1>
            <SharingButton />
          </div>
          <DescriptionTextArea />
          <div className='flex justify-between flex-row  py-7'>
            <SortingButton />
            <AddMemoryModal />
          </div>
        </div>
        {/* <div className='w-2/5 ml-auto mr-auto'>
          <PostedCard
            imageUrl={img1}
            name={'odelia'}
            description={
              'hello world hello world hello worldhello world hello world'
            }
            date={''}
          />
        </div> */}
        <MemoryList />
      </div>
    </div>
  )
}

export default App
