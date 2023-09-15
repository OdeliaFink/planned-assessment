import * as React from 'react'
import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import DescriptionTextArea from './components/DescriptionTextArea'
import SortingButton from './components/buttons/SortingButton'
import SharingButton from './components/buttons/SharingButton'
import AddMemoryModal from './components/AddMemoryModal'
import MemoryList from './components/MemoryList'

interface SortingOrder {
  newToOld: 'newToOld'
  oldToNew: 'oldToNew'
}

function App() {
  const [sortOrder, setSortOrder] =
    React.useState<SortingOrder['newToOld']>('newToOld')

  // Function to handle sorting order change
  const handleSortOrderChange = (newSortOrder: any) => {
    setSortOrder(newSortOrder)
  }
  return (
    <div className='flex bg-gray-100 h-screen'>
      <div className='flex-shrink-0 p-2  pt-5 border-r border-gray-300'>
        <CubeIcon className='h-12 w-12 inline-block' />
      </div>
      <div className='flex-grow flex flex-col justify-between'>
        <div className='px-10'>
          <div className='px-3 py-6 pt-12 flex justify-between'>
            <h1 className='font-semibold text-4xl tracking-wide'>
              odelia's memory lane
            </h1>
            <SharingButton />
          </div>
          <DescriptionTextArea />
          <div className='flex justify-between flex-row  py-7'>
            <SortingButton
              sortOrder={sortOrder}
              onSortOrderChange={handleSortOrderChange}
            />
            <AddMemoryModal />
          </div>
        </div>
        <MemoryList sortOrder={sortOrder} />
      </div>
    </div>
  )
}

export default App
