import * as React from 'react'
import MemoryCard from './MemoryCard'

interface MemoryListProps {
  sortOrder: 'newToOld' | 'oldToNew'
}

const MemoryList: React.FC<MemoryListProps> = ({ sortOrder }) => {
  const [memories, setMemories] = React.useState<any[]>([])
  const [errorMsg, setErrorMsg] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsLoading(true)
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
  }, [])

  const addMemoryToList = (newMemory: any) => {
    setMemories([...memories, newMemory])
  }

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
    <>
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
                date={memory.timestamp} // Assuming 'timestamp' is the date
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
    </>
  )
}

export default MemoryList
