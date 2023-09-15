import * as React from 'react'

interface MemoryCardProps {
  imageUrl: string
  name: string
  description: string
  date: string
  memoryId: any
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  imageUrl,
  name,
  description,
  date,
  memoryId,
}) => {
  const [showOptions, setShowOptions] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedData, setEditedData] = React.useState({
    name: name,
    description: description,
    imageUrl: imageUrl,
  })

  const dropdownRef = React.useRef<HTMLDivElement | null>(null)

  // Function to handle outside click
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false)
    }
  }

  const handleScroll = () => {
    setShowOptions(false)
  }

  React.useEffect(() => {
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', handleScroll)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showOptions])

  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setShowOptions(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDelete = () => {
    fetch(`http://localhost:4001/memories/${memoryId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Memory deleted successfully')
        } else {
          console.error('Failed to delete memory')
        }
      })
      .catch((error) => {
        console.error('Error deleting memory:', error)
      })
  }

  const handleSave = () => {
    // Implement the save functionality here
    console.log('Save clicked', editedData)
    setIsEditing(false)
  }

  return (
    <div className='px-5 border border-gray-300  rounded-lg shadow-md w-[100%]'>
      <div className='flex items-center pt-1'>
        <div className='flex-shrink-0 ml-3 mt-2'>
          <img
            src={imageUrl}
            alt='image'
            className='w-24 h-24 rounded-full border border-grey shadow-md'
          />
        </div>
        <div className='m-4'>
          <h3 className='text-1xl font-semibold'>{name}</h3>
          <p className='text-gray-600 mt-3'>{description}</p>
        </div>
      </div>
      <div className='flex justify-end mt-3'>
        <div className='flex flex-row'>
          <p className='text-gray-400 text-sm mt-4 mr-[12rem]'>{date}</p>
          <div className='relative inline-block text-left'>
            <button
              onClick={toggleOptions}
              className='text-gray-600 hover:text-gray-800 mt-3'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 12a2 2 0 100-4 2 2 0 000 4zM2 10a2 2 0 114 0 2 2 0 01-4 0zm14 0a2 2 0 114 0 2 2 0 01-4 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          {showOptions && (
            <div
              ref={dropdownRef}
              className='origin-top-right absolute right-56 mt-2 w-42 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
            >
              <div
                className='py-0'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <button
                  onClick={handleEdit}
                  className='w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100'
                  role='menuitem'
                >
                  edit
                </button>
                <button
                  onClick={handleDelete}
                  className='w-full px-4 py-2 text-left text-red-700 hover:bg-gray-100'
                  role='menuitem'
                >
                  delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <div className='fixed inset-0 flex justify-center items-center z-10'>
          <div className='bg-white p-5 rounded shadow-lg border border-black'>
            <h2 className='text-2xl font-semibold mb-4'>edit memory</h2>
            <label className='block mb-2'>name:</label>
            <input
              type='text'
              value={editedData.name}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
              className='border border-gray-300 rounded-md p-2 mb-4 w-full'
            />
            <label className='block mb-2'>description:</label>
            <textarea
              value={editedData.description}
              onChange={(e) =>
                setEditedData({ ...editedData, description: e.target.value })
              }
              className='border border-gray-300 rounded-md p-2 mb-4 w-full h-32 resize-none'
            />
            <label className='block mb-2'>image url:</label>
            <input
              type='text'
              value={editedData.imageUrl}
              onChange={(e) =>
                setEditedData({ ...editedData, imageUrl: e.target.value })
              }
              className='border border-gray-300 rounded-md p-2 mb-4 w-full'
            />
            <div className='flex justify-between'>
              <button
                onClick={handleCancel}
                className='bg-gray-400 ease-in-out duration-300 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-1/2 mr-2'
              >
                cancel
              </button>
              <button
                onClick={handleSave}
                className='bg-orange-400 ease-in-out duration-300 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-1/2 ml-2'
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryCard
