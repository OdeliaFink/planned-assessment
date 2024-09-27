import * as React from 'react'
import * as Yup from 'yup'

type Props = {
  updateParentHandler: () => void
}

const AddMemoryModal = ({ updateParentHandler }: Props) => {
  const [formData, setFormData] = React.useState({})
  const [isModalOpen, setModalOpen] = React.useState(false)
  const [validationErrors, setValidationErrors] = React.useState<string[]>([])
  const validUrlRegex = new RegExp(/^(https:\/\/|www\.)[^\/]*\/.*$/)

  const schema = Yup.object().shape({
    description: Yup.string().required('description is required'),
    imageUrl: Yup.string()
      .required('image url is required')
      .matches(validUrlRegex, 'enter valid url'),
    name: Yup.string().required('name is required'),
  })

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = e.target.value
    setFormData({ ...formData, description })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setValidationErrors([])
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false })
      const timestamp = new Date().toISOString()

      const dataToSend = { ...formData, timestamp }
      const response = await fetch('http://localhost:4001/memories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (response.status === 201) {
        const newMemory = await response.json()
        console.log('Memory created successfully:', newMemory)
        updateParentHandler()
        setFormData({})
        closeModal()
      } else {
        const responseData = await response.json()
        console.error('Server error:', responseData.error)
        throw new Error(`API responded with status ${response.status}`)
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setValidationErrors(err.errors)
      } else {
        console.error('Unknown error:', err)
      }
    }
  }

  return (
    <div>
      <button
        className='flex rounded-md bg-white border border-gray-400 px-2 py-1 items-center hover:bg-orange-200 hover:border-orange-200 focus:outline-none ease-in-out duration-300'
        onClick={openModal}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-3 h-3 text-black'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 2a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H3a1 1 0 0 1 0-2h6V3a1 1 0 0 1 1-1z'
            clipRule='evenodd'
          />
        </svg>
        <h1 className='ml-2 text-xs'>add memory</h1>
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white w-1/2 p-6 rounded-md shadow-lg border border-solid border-gray-400'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-xs font-medium text-gray-700'
                >
                  name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className={`mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-gray-200 focus:outline-none block w-full text-xs ${
                    validationErrors.includes('name is required')
                      ? 'border-red-500'
                      : ''
                  }`}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-xs font-medium text-gray-700'
                >
                  description
                </label>
                <textarea
                  id='description'
                  name='description'
                  maxLength={75}
                  rows={3}
                  className={`mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-gray-200 focus:outline-none block w-full text-xs ${
                    validationErrors.includes('description is required')
                      ? 'border-red-500'
                      : ''
                  }`}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value })
                    handleDescriptionChange
                  }}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='imageUrl'
                  className='block text-xs font-medium text-gray-700'
                >
                  image url
                </label>
                <input
                  type='text'
                  id='imageUrl'
                  name='imageUrl'
                  className={`mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-gray-200 focus:outline-none block w-full text-xs ${
                    validationErrors.includes('image url is required') ||
                    validationErrors.includes('enter valid url')
                      ? 'border-red-500'
                      : ''
                  }`}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              </div>
              <ul className='text-xs text-red-600'>
                {validationErrors.length > 0
                  ? validationErrors.map((error: string) => <li>{error}</li>)
                  : null}
              </ul>
              <div className='mt-4 flex justify-end'>
                <button
                  type='button'
                  className='mr-4 px-4 w-1/2 py-2 bg-neutral-300 text-gray-700 text-xs rounded-md hover:bg-gray-200  focus:outline-none'
                  onClick={closeModal}
                >
                  cancel
                </button>
                <button
                  type='submit'
                  className='w-1/2 px-4 py-2 bg-orange-400 text-xs text-white rounded-md hover:bg-orange-200 focus:outline-none'
                >
                  add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddMemoryModal
