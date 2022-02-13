import { AiOutlineClose } from 'react-icons/ai'

const FileDisplayContainer = ({images, setImages}) => {
  const handleDeleteImage = idx => {
    const imagesCopy = [...images]
    imagesCopy.splice(idx, 1)
    setImages(imagesCopy)
  }

  return (
    <div className='border-t-2 h-20 flex items-center gap-6 px-4'>
      {
        images.map((image, idx) => (
          <div key={idx} className='relative'>
            <img src={URL.createObjectURL(image)} alt={idx} className='w-16 h-16 gap-6' />
            <AiOutlineClose className='absolute -top-1 -right-2 border rounded-full text-red-400 border-red-400 text-xl bg-white cursor-pointer' onClick={() => handleDeleteImage(idx)} />
          </div>
        ))
      }
    </div>
  )
}

export default FileDisplayContainer 