import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiSendPlaneFill } from 'react-icons/ri'
import { IoMdAttach } from 'react-icons/io'
import { HiPhotograph } from 'react-icons/hi'
import { FaMicrophone } from 'react-icons/fa'
import { createMessage } from './../../redux/actions/messageActions'

const ChatInput = ({ selectContact }) => {
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const handleSubmit = e => {
    e.preventDefault()

    const chatData = {
      sender: auth.user,
      recipient: selectContact,
      text: message,
      media: [],
      createdAt: new Date().toISOString()
    }

    dispatch(createMessage(chatData, auth.token))
    setMessage('')
  }
  
  return (
    <div className='border-t-2 py-3 px-5'>
      <form onSubmit={handleSubmit} className='flex items-center justify-between'>
        <input type='text' placeholder='Message here ...' className='outline-0 w-full pr-3' value={message} onChange={e => setMessage(e.target.value)} />
        <div className='flex items-center'>
          <div className='relative w-[20px] h-[20px] overflow-hidden mr-3'>
            <input type='file' className='absolute z-10 opacity-0 h-[20px]' />
            <IoMdAttach className='text-xl text-gray-700 absolute top-0 left-0' />
          </div>
          <div className='relative w-[20px] h-[20px] overflow-hidden mr-3'>
            <input type='file' className='absolute z-10 opacity-0 h-[20px]' />
            <HiPhotograph className='text-xl text-gray-700 absolute top-0 left-0' />
          </div>
          <FaMicrophone className='text-xl text-gray-700 mr-3 cursor-pointer' />
          <RiSendPlaneFill className='text-xl text-gray-70 cursor-pointer' />
        </div>
      </form>
    </div>
  )
}

export default ChatInput