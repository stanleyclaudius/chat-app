import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiSendPlaneFill } from 'react-icons/ri'
import { IoMdAttach } from 'react-icons/io'
import { HiPhotograph } from 'react-icons/hi'
import { FaMicrophone } from 'react-icons/fa'
import { uploadImage } from './../../utils/imageHelper'
import { createMessage } from './../../redux/actions/messageActions'
import FileDisplayContainer from './../general/FileDisplayContainer'

const ChatInput = ({ selectContact }) => {
  const [message, setMessage] = useState('')
  const [images, setImages] = useState([])

  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  const handleChangeImage = e => {
    const files = [...e.target.files]
    setImages([...images, ...files])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!message && images.length === 0) return

    setMessage('')
    setImages([])

    let newImages = []
    if (images.length > 0) {
      newImages = await uploadImage(images, 'chat')
    }

    const chatData = {
      sender: auth.user,
      recipient: selectContact,
      text: message,
      media: newImages,
      createdAt: new Date().toISOString()
    }

    dispatch(createMessage(chatData, auth.token, socket))
  }
  
  return (
    <>
      {images.length > 0 && <FileDisplayContainer images={images} setImages={setImages} />}
      <div className='border-t-2 py-3 px-5'>
        <form onSubmit={handleSubmit} className='flex items-center justify-between'>
          <input type='text' placeholder='Message here ...' autoFocus className='outline-0 w-full pr-3' value={message} onChange={e => setMessage(e.target.value)} />
          <div className='flex items-center'>
            <div className='relative w-[20px] h-[20px] overflow-hidden mr-3'>
              <input type='file' className='absolute z-10 opacity-0 h-[20px]' />
              <IoMdAttach className='text-xl text-gray-700 absolute top-0 left-0' />
            </div>
            <div className='relative w-[20px] h-[20px] overflow-hidden mr-3'>
              <input type='file' multiple accept="image/*" onChange={handleChangeImage} className='absolute z-10 opacity-0 h-[20px]' />
              <HiPhotograph className='text-xl text-gray-700 absolute top-0 left-0' />
            </div>
            <FaMicrophone className='text-xl text-gray-700 mr-3 cursor-pointer' />
            <RiSendPlaneFill className='text-xl text-gray-70 cursor-pointer' onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </>
  )
}

export default ChatInput