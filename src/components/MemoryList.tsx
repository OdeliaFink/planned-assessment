import * as React from 'react'
import AddMemoryModal from './AddMemoryModal'
import SortingButton from './buttons/SortingButton'
import MemoryCard from './MemoryCard'

interface SortingOrder {
  newToOld: 'newToOld'
  oldToNew: 'oldToNew'
}

const MemoryList = () => {
  const [memories, setMemories] = React.useState<any[]>([])
  const [errorMsg, setErrorMsg] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [sortOrder, setSortOrder] =
    React.useState<SortingOrder['newToOld']>('newToOld')

  // const addMemoryToList = (newMemory: any) => {
  //   setMemories([...memories, newMemory])
  // }

  // Function to handle sorting order change
  const handleSortOrderChange = (newSortOrder: any) => {
    setSortOrder(newSortOrder)
  }

  const fetchMemories = () => {
    fetch('http://localhost:4001/memories/')
      .then((response) => response.json())
      .then((data) => {
        setMemories(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setErrorMsg(error.message || 'An error occurred')
      })
  }

  const refreshMemories = React.useCallback(() => {
    setIsLoading(true)
    fetchMemories()
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    refreshMemories()
  }, [])

  // Sort memories based on sortOrder
  const sortedMemories = [...memories].sort((a, b) => {
    if (sortOrder === 'newToOld') {
      return a.timestamp.localeCompare(b.timestamp)
    } else {
      return b.timestamp.localeCompare(a.timestamp)
    }
  })

  if (errorMsg) {
    return <p>{errorMsg}</p>
  }
  if (isLoading) {
    return <p>loading...add icon</p>
  }

  return (
    <div className='flex flex-col px-10'>
      <div className='flex justify-between flex-row  py-7'>
        <SortingButton
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
        />
        <AddMemoryModal updateParentHandler={refreshMemories} />
      </div>
      <ul>
        {sortedMemories.map(
          (
            memory: {
              id: number
              name: string
              description: string
              timestamp: string
              imageUrl: string
            },
            index: number
          ) => (
            <li
              key={memory.id}
              className='flex flex-col justify-center  w-2/5 ml-auto mr-auto py-2'
            >
              <MemoryCard
                memoryId={memory.id}
                imageUrl={memory.imageUrl}
                name={memory.name}
                description={memory.description}
                date={memory.timestamp}
                updateParentHandler={refreshMemories}
              />
              {index !== memories.length - 1 && (
                <ul className='w-[10%] ml-auto mr-auto py-2 pt-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    viewBox='0 0 10 30'
                  >
                    <circle cx='5' cy='5' r='2' fill='black' />
                    <circle cx='5' cy='15' r='2' fill='black' />
                    <circle cx='5' cy='25' r='2' fill='black' />
                  </svg>
                </ul>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default MemoryList
