import * as React from 'react'
interface MemoryCardProps {
  date: string
  description: string
  imageUrl: string
  memoryId: number
  name: string
  updateParentHandler: () => void
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  date,
  description,
  imageUrl,
  memoryId,
  name,
  updateParentHandler,
}) => {
  const [editedData, setEditedData] = React.useState({
    name: name,
    description: description,
    imageUrl: imageUrl,
  })
  const [isEditing, setIsEditing] = React.useState(false)
  const [isUrlValid, setIsUrlValid] = React.useState<boolean>(true)
  const [showOptions, setShowOptions] = React.useState(false)

  const validUrlRegex = new RegExp(/^(https:\/\/|www\.)[^\/]*\/.*$/)
  const dropdownRef = React.useRef<HTMLDivElement | null>(null)

  const formatDate = (date: Date, dateFormat: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString('en-US', dateFormat)

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
          updateParentHandler()
        } else {
          console.error('Failed to delete memory')
        }
      })
      .catch((error) => {
        console.error('Error deleting memory:', error)
      })
  }

  const handleSave = () => {
    if (!validUrlRegex.test(editedData.imageUrl)) {
      setIsEditing(true)
      setIsUrlValid(false)
      return
    }
    console.log('Save clicked', editedData)
    setIsEditing(false)
    setIsUrlValid(true)
    fetch(`http://localhost:4001/memories/${memoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (response.ok) {
          updateParentHandler()
        } else {
          throw new Error(`API responded with status ${response.status}`)
        }
      })
      .catch((error) => {
        console.error('Error updating memory:', error)
      })
  }

  return (
    <div className='px-5 border border-orange-100  rounded-lg shadow-xl w-[100%] bg-orange-100 lg:max-h-[130px]'>
      <div
        className={`flex items-center max-h-auto pt-${
          description.length < 75 ? 3 : 2
        }`}
      >
        <div className='flex-shrink-0 3'>
          <img
            src={imageUrl}
            alt='image'
            className='w-24 h-24 rounded-full border border-grey shadow-md'
          />
        </div>
        <div className={`m-4 ${description.length < 75 ? `-mt-2` : `mt-2`}`}>
          <h3 className='text-xs font-semibold'>{name}</h3>
          <p className='text-gray-400 text-xs mt-1 mr-[2rem] text-xs'>
            {formatDate(new Date(date), {
              month: 'short',
              year: 'numeric',
              day: 'numeric',
            })}
          </p>
          <p className='text-gray-600 mt-1 text-xs'>{description}</p>
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='flex flex-row'>
          <div className='relative bottom-[2rem]'>
            <button
              onClick={toggleOptions}
              className='text-black-600 hover:text-orange-400 ease-in-out duration-300 mt-[1.75rem]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4'
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
              <div
                ref={dropdownRef}
                className='origin-top-right absolute w-42 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
              >
                <div
                  className='py-0'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='options-menu'
                >
                  <button
                    onClick={handleEdit}
                    className='w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-100'
                    role='menuitem'
                  >
                    edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className='w-full px-4 py-2 text-left text-xs text-red-700 hover:bg-gray-100'
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
      {isEditing && (
        <div className='fixed inset-0 flex justify-center items-center z-10'>
          <div className='bg-white p-5 px-7 rounded shadow-lg border border-gray-400 w-[50%]'>
            <form>
              <label className='block mb-2 text-xs'>name:</label>
              <input
                type='text'
                value={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
                className='border border-gray-300 px-3 rounded-md p-2 mb-4 w-full text-xs'
              />
              <label className='block mb-2 text-xs'>description:</label>
              <textarea
                maxLength={75}
                value={editedData.description}
                onChange={(e) =>
                  setEditedData({ ...editedData, description: e.target.value })
                }
                className='border border-gray-300 rounded-md p-2 mb-4 w-full h-15 resize-none text-xs'
              />
              <label className='block mb-2 text-xs'>image url:</label>
              <input
                type='text'
                value={editedData.imageUrl}
                onChange={(e) => {
                  const newImageUrl = e.target.value

                  setEditedData({ ...editedData, imageUrl: e.target.value })
                  setIsUrlValid(validUrlRegex.test(newImageUrl.trim()))
                }}
                className='border border-gray-300 rounded-md p-2 mb-3 w-full text-xs'
              />
              {!isUrlValid && (
                <div className='text-red-500 mb-4'>
                  <p className='text-sm ml-1'>
                    invalid url - please enter a valid url
                  </p>
                </div>
              )}
            </form>
            <div className='flex justify-between'>
              <button
                onClick={handleCancel}
                className='bg-gray-400 ease-in-out duration-300 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-1/2 mr-2 text-xs'
              >
                cancel
              </button>
              <button
                onClick={handleSave}
                className='bg-orange-400 ease-in-out duration-300 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-1/2 ml-2 text-xs'
                disabled={!isUrlValid ? true : false}
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
