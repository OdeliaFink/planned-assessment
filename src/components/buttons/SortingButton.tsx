import * as React from 'react'

interface SortingButtonProps {
  onSortOrderChange: (newSortOrder: 'newToOld' | 'oldToNew') => void
  sortOrder: 'newToOld' | 'oldToNew'
}

const SortingButton: React.FC<SortingButtonProps> = ({
  onSortOrderChange,
  sortOrder,
}) => {
  const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const handleSortClick = (newSortOrder: 'newToOld' | 'oldToNew') => {
    onSortOrderChange(newSortOrder)
    toggleDropdown()
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (isDropdownOpen) {
        toggleDropdown()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDropdownOpen])

  const availableOptions =
    sortOrder === 'newToOld' ? ['new to old'] : ['old to new']

  return (
    <div className='relative inline-block'>
      <button
        className='rounded-md bg-white px-2 py-1 pr-6 hover:bg-orange-200 ease-in-out duration-200 focus:outline-none text-xs bg-white shadow-md'
        onClick={toggleDropdown}
      >
        {sortOrder === 'newToOld' ? 'old to new' : 'new to old'}{' '}
        <span className='ml-1'>
          {isDropdownOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 inline-block transform rotate-180'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 inline-block transform rotate-180'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 15l7-7 7 7'
              />
            </svg>
          )}
        </span>
      </button>
      {isDropdownOpen && (
        <ul className='absolute mt-[1px] bg-white rounded-md shadow-lg hover:bg-orange-200'>
          {availableOptions.map((option) => (
            <li
              key={option}
              className='px-5 py-1 cursor-pointer text-xs'
              onClick={() =>
                handleSortClick(
                  sortOrder === 'newToOld' ? 'oldToNew' : 'newToOld'
                )
              }
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SortingButton
