import * as React from 'react'
import PostedCard from './MemoryCard'

const MemoryList = () => {
  const [memories, setMemories] = React.useState([])
  const [errorMsg, setErrorMsg] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:4001/memories/', { mode: 'no-cors' })
      .then((response) => {
        setIsLoading(false)
        return response.text()
      })
      .then((data) => {
        console.log('🚀 ~ file: MemoryList.tsx:21 ~ .then ~ data:', data)
        resolve(data ? JSON.parse(data) : {})
        // setMemories(data)
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
        <h1>Memory list</h1>
        <ul>
          {memories.map(
            (memory: {
              id: React.Key | null | undefined
              name: string
              description: string
              timestamp: string
            }) => (
              <li key={memory.id}>
                <PostedCard
                  imageUrl={''}
                  name={memory.name}
                  description={memory.description}
                  date={memory.timestamp} // Assuming 'timestamp' is the date
                />
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
