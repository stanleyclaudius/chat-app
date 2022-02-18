import { AiOutlineClose, AiFillFilePdf, AiFillFileExcel, AiFillFileWord, AiFillFilePpt, AiFillFileZip, AiFillFileUnknown } from 'react-icons/ai'

const FileDisplayContainer = ({files, setFiles, images, setImages}) => {
  const handleDeleteImage = idx => {
    const imagesCopy = [...images]
    imagesCopy.splice(idx, 1)
    setImages(imagesCopy)
  }

  const handleDeleteFile = idx => {
    const fileCopy = [...files]
    fileCopy.splice(idx, 1)
    setFiles(fileCopy)
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

      {
        files.map((file, idx) => (
          <>
            {
              file.name.split('.')[file.name.split('.').length - 1] === 'pdf'
              ? (
                <div className='border-2 w-16 h-16 flex items-center justify-center relative' key={idx}>
                  <AiFillFilePdf className='w-14 h-14 text-red-500' /
                  >
                  <AiOutlineClose className='absolute -top-1 -right-2 border rounded-full text-red-400 border-red-400 text-xl bg-white cursor-pointer' onClick={() => handleDeleteFile(idx)} />
                </div>
              )
              : file.name.split('.')[file.name.split('.').length - 1].includes('xlsx', 'xls')
                ? (
                  <div className='border-2 w-16 h-16 flex items-center justify-center relative' key={idx}>
                    <AiFillFileExcel className='w-14 h-14 text-green-500' /
                    >
                    <AiOutlineClose className='absolute -top-1 -right-2 border rounded-full text-red-400 border-red-400 text-xl bg-white cursor-pointer' onClick={() => handleDeleteFile(idx)} />
                  </div>
                )
                : file.name.split('.')[file.name.split('.').length - 1].includes('docx', 'doc')
                  ? (
                    <div className='border-2 w-16 h-16 flex items-center justify-center relative' key={idx}>
                      <AiFillFileWord className='w-14 h-14 text-blue-500' /
                      >
                      <AiOutlineClose className='absolute -top-1 -right-2 border rounded-full text-red-400 border-red-400 text-xl bg-white cursor-pointer' onClick={() => handleDeleteFile(idx)} />
                    </div>
                  )
                  : file.name.split('.')[file.name.split('.').length - 1].includes('pptx', 'ppt')
                    ? (
                      <div className='border-2 w-16 h-16 flex items-center justify-center relative' key={idx}>
                        <AiFillFilePpt className='w-14 h-14 text-orange-500' /
                        >
                        <AiOutlineClose className='absolute -top-1 -right-2 border rounded-full text-red-400 border-red-400 text-xl bg-white cursor-pointer' onClick={() => handleDeleteFile(idx)} />
                      </div>
                    )
                    : file.name.split('.')[file.name.split('.').length - 1] === 'zip'
                      ? (
                        <div className='border-2 w-16 h-16 flex items-center justify-center relative' key={idx}>
                          <AiFillFileZip className='w-14 h-14 text-gray-500' /
                          >
                          <AiOutlineClose className='absolute -top-1 -right-2 border rounded-full text-red-400 border-red-400 text-xl bg-white cursor-pointer' onClick={() => handleDeleteFile(idx)} />
                        </div>
                      )
                      : (
                        <div className='border-2 w-16 h-16 flex items-center justify-center relative' key={idx}>
                          <AiFillFileUnknown className='w-14 h-14 text-gray-500' /
                          >
                          <AiOutlineClose className='absolute -top-1 -right-2 border rounded-full text-red-400 border-red-400 text-xl bg-white cursor-pointer' onClick={() => handleDeleteFile(idx)} />
                        </div>
                      )
            }
          </>
        ))
      }
    </div>
  )
}

export default FileDisplayContainer 