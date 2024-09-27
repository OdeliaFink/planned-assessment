import * as React from 'react'
import AddMemoryModal from './AddMemoryModal'
import MemoryCard from './MemoryCard'
import SortingButton from './buttons/SortingButton'

interface SortingOrder {
  newToOld: 'newToOld'
  oldToNew: 'oldToNew'
}

const MemoryList = () => {
  const [errorMsg, setErrorMsg] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [memories, setMemories] = React.useState<any[]>([])
  const [sortOrder, setSortOrder] =
    React.useState<SortingOrder['newToOld']>('newToOld')

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
    return (
      <svg
        width='100'
        height='100'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='50'
          cy='50'
          r='45'
          fill='none'
          stroke='#3498db'
          stroke-width='4'
        >
          <animateTransform
            attributeName='transform'
            attributeType='XML'
            type='rotate'
            from='0 50 50'
            to='360 50 50'
            dur='2s'
            repeatCount='indefinite'
          />
        </circle>
      </svg>
    )
  }

  return (
    <div className='flex flex-col px-12 pb-[5rem] mt-[-1rem]'>
      <div className='flex justify-between flex-row pt-8 pb-4'>
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
              description: string
              id: number
              imageUrl: string
              name: string
              timestamp: string
            },
            index: number
          ) => (
            <li
              key={memory.id}
              className='flex flex-col justify-center lg:w-2/5 ml-auto mr-auto'
            >
              <MemoryCard
                date={memory.timestamp}
                description={memory.description}
                imageUrl={memory.imageUrl}
                memoryId={memory.id}
                name={memory.name}
                updateParentHandler={refreshMemories}
              />
              {index !== memories.length - 1 && (
                <ul className='w-[10%] ml-auto mr-auto py-2 pt-1'>
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
