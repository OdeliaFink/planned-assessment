import * as React from 'react'

const DescriptionTextArea: React.FC = () => {
  const [content, setContent] = React.useState<string>('')
  const [isEditing, setIsEditing] = React.useState<boolean>(false)

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className='w-full  rounded-lg border border-gray-200 px-4 pt-4 pb-1 bg-white shadow-md'>
      {isEditing ? (
        <textarea
          className='w-full h-30 resize-none outline-none'
          placeholder='Enter your text here...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className='w-full h-full '>
          <p className='text-xs mr-[1rem]'>
            {content ||
              'odelia’s journey has been a tapestry of curiosity and exploration. from a young age, their inquisitive mind led them through diverse interests. education shaped their multidisciplinary perspective, while personal experiences added depth and resilience to their story. embracing challenges and cherishing relationship, odelia continues to craft a unique and inspiring life story.'}
          </p>
        </div>
      )}

      <div className='flex justify-end'>
        <button
          className='p-q rounded-full bg-white-300 hover:bg-orange-200 ease-in-out duration-300 focus:outline-none'
          onClick={handleEditToggle}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-9 h-6 text-black-400 '
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
    </div>
  )
}

export default DescriptionTextArea
