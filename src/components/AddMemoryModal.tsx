import * as React from 'react'
import * as Yup from 'yup'

const AddMemoryModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    imageUrl: '',
  })

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    imageUrl: Yup.string().required('Image url is required'),
  })

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false })
      const timestamp = new Date().toISOString()

      const dataToSend = { ...formData, timestamp }

      console.log('Form data:', dataToSend)

      const response = await fetch('/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (response.status === 201) {
        console.log('Memory created successfully')
      } else {
        const responseData = await response.json()
        console.error('Server error:', responseData.error)
      }

      closeModal()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = err.errors.join(', ')
        console.error('Validation errors:', validationErrors)
      } else {
        console.error('Unknown error:', err)
      }
    }
  }

  return (
    <div>
      <button
        className='flex rounded-md bg-white border border-black px-2 py-1 items-center hover:bg-orange-200 focus:outline-none'
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
        <div className='fixed inset-0 flex items-center justify-center z-50 mt-15 '>
          <div className='bg-white w-1/2 p-6 rounded-md shadow-lg border-2 border-solid border-black'>
            <h2 className='text-lg font-semibold mb-4'>Add Memory</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none block w-full sm:text-sm'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                {/* <div className='text-red-600 text-sm'>
                  {schema.errors?.name}
                </div> */}
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  description
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows={3}
                  className='mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none block w-full sm:text-sm'
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                {/* <div className='text-red-600 text-sm'>
                  {schema.errors?.description}
                </div> */}
              </div>
              <div className='mt-4 flex justify-end'>
                <button
                  type='button'
                  className='mr-4 px-4 py-2 bg-neutral-300 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none'
                  onClick={closeModal}
                >
                  cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-200 focus:outline-none'
                >
                  submit
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
