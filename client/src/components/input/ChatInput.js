import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiSendPlaneFill } from 'react-icons/ri'
import { IoMdAttach } from 'react-icons/io'
import { HiPhotograph } from 'react-icons/hi'
import { FaMicrophone } from 'react-icons/fa'
import { uploadImage } from './../../utils/imageHelper'
import { createMessage } from './../../redux/actions/messageActions'
import FileDisplayContainer from './../general/FileDisplayContainer'
import RecorderContainer from './../general/RecorderContainer'

const ChatInput = ({ selectContact }) => {
  const [isOnMicrophone, setIsOnMicrophone] = useState(false)
  const [message, setMessage] = useState('')
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])

  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  const handleChangeImage = e => {
    const files = [...e.target.files]
    setImages([...images, ...files])
  }

  const handleChangeFile = e => {
    const chosenFile = [...e.target.files]
    setFiles([...files, ...chosenFile])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!message && images.length === 0 && files.length === 0) return

    setMessage('')
    setImages([])
    setFiles([])

    let newImages = []
    if (images.length > 0) {
      newImages = await uploadImage(images, 'chat')
    }

    let newFiles = []
    if (files.length > 0) {
      newFiles = await uploadImage(files, 'chat')
    }

    const chatData = {
      sender: auth.user,
      recipient: selectContact,
      text: message,
      media: newImages,
      audio: '',
      files: newFiles,
      isRead: false,
      call: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    dispatch(createMessage(chatData, auth.token, socket))
    socket.emit('doneTyping', {
      recipient: selectContact._id
    })
  }

  const handleKeyPressed = () => {
    socket.emit('typing', {
      recipient: selectContact._id,
      sender: {
        name: auth.user?.name
      }
    })
  }

  useEffect(() => {
    if (!message) {
      socket.emit('doneTyping', { recipient: selectContact._id })
    }
  }, [message, socket, selectContact])
  
  return (
    <>
      {(images.length > 0 || files.length > 0) && <FileDisplayContainer files={files} setFiles={setFiles} images={images} setImages={setImages} />}
      {
        isOnMicrophone ? (
          <RecorderContainer selectContact={selectContact} setIsOnMicrophone={setIsOnMicrophone} />
        )
        : (
          <div className='border-t-2 py-3 px-5'>
            <form onSubmit={handleSubmit} className='flex items-center justify-between'>
              <input type='text' placeholder='Message here ...' autoFocus className='outline-0 w-full pr-3' value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleKeyPressed} />
              <div className='flex items-center'>
                <div className='relative w-[20px] h-[20px] overflow-hidden mr-3'>
                  <input type='file' className='absolute z-10 opacity-0 h-[20px]' accept='.zip,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.pdf' multiple onChange={handleChangeFile} />
                  <IoMdAttach className='text-xl text-gray-700 absolute top-0 left-0' />
                </div>
                <div className='relative w-[20px] h-[20px] overflow-hidden mr-3'>
                  <input type='file' multiple accept='image/*' onChange={handleChangeImage} className='absolute z-10 opacity-0 h-[20px]' />
                  <HiPhotograph className='text-xl text-gray-700 absolute top-0 left-0' />
                </div>
                <FaMicrophone className='text-xl text-gray-700 mr-3 cursor-pointer' onClick={() => setIsOnMicrophone(true)} />
                <RiSendPlaneFill className='text-xl text-gray-70 cursor-pointer' onClick={handleSubmit} />
              </div>
            </form>
          </div>
        )
      }
    </>
  )
}

export default ChatInput