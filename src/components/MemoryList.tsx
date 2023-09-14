import * as React from 'react'
import PostedCard from './MemoryCard'

const MemoryList = () => {
  const [memories, setMemories] = React.useState([])
  const [errorMsg, setErrorMsg] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:4001/memories/')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('🚀 ~ file: MemoryList.tsx:21 ~ .then ~ data:', data)
        setMemories(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setErrorMsg(error)
      })
  }, [])

  console.log('MEMORIEs', memories)
  if (errorMsg) {
    return <p>an error occured</p>
  }
  if (isLoading) {
    return <p>loading...add icon</p>
  }
  if (memories) {
    return (
      <>
        <ul>
          {memories.map(
            (
              memory: {
                id: React.Key | null | undefined
                name: string
                description: string
                timestamp: string
              },
              index
            ) => (
              <li
                key={memory.id}
                className='flex flex-col justify-center  w-2/5 ml-auto mr-auto py-2'
              >
                <PostedCard
                  imageUrl={''}
                  name={memory.name}
                  description={memory.description}
                  date={memory.timestamp} // Assuming 'timestamp' is the date
                />
                {index !== memories.length - 1 && (
                  <li className='w-[2%] ml-auto mr-auto py-2 pt-5'>
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
                  </li>
                )}
              </li>
            )
          )}
        </ul>
      </>
    )
  } else {
    return null
  }
}

export default MemoryList
