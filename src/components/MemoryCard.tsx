import * as React from 'react'

interface MemoryCardProps {
  imageUrl: string
  name: string
  description: string
  date: string
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  imageUrl,
  name,
  description,
  date,
}) => {
  const [showOptions, setShowOptions] = React.useState(false)

  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }

  const handleEdit = () => {
    // Implement the edit functionality here
    console.log('Edit clicked')
  }

  const handleDelete = () => {
    // Implement the delete functionality here
    console.log('Delete clicked')
  }

  return (
    <div className='py-2 px-5 border border-gray-300 rounded-lg shadow-md'>
      <div className='flex items-center pt-2 '>
        <div className='flex-shrink-0 ml-4'>
          <img
            src={imageUrl}
            alt='User Avatar'
            className='w-24 h-24 rounded-full'
          />
        </div>
        <div className='ml-12'>
          <h3 className='text-2xl font-semibold mt-1'>{name}</h3>
          <p className='text-gray-600 mt-3'>{description}</p>
        </div>
      </div>
      <div className='flex justify-end mt-3'>
        <p className='text-gray-400 text-sm mt-4 mx-2'>{date}</p>
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
          {showOptions && (
            <div className='origin-top-right absolute mt-2 w-42 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
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
    </div>
  )
}

export default MemoryCard
