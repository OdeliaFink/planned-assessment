import * as React from 'react'

const SortingButton: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
  const [sortOrder, setSortOrder] = React.useState<'newToOld' | 'oldToNew'>(
    'newToOld'
  )
  const [data, setData] = React.useState<string[]>([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ])

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const handleSortClick = (newSortOrder: 'newToOld' | 'oldToNew') => {
    setSortOrder(newSortOrder)
    toggleDropdown()
    // Sort the data accordingly
    setData((prevData) =>
      newSortOrder === 'newToOld'
        ? [...prevData].sort()
        : [...prevData].sort().reverse()
    )
  }

  const availableOptions =
    sortOrder === 'newToOld' ? ['old to new'] : ['new to old']

  return (
    <div className='relative inline-block'>
      <button
        className='rounded-md bg-white border border-black px-2 py-1  pr-6 hover:bg-orange-200 ease-in-out duration-200 focus:outline-none text-xs'
        onClick={toggleDropdown}
      >
        {sortOrder === 'newToOld' ? 'new to old' : 'old to new'}{' '}
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
        <ul className='absolute mt-0 py-1 bg-white border border-white rounded-md shadow-lg hover:bg-orange-200'>
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
