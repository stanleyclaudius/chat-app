import { RiSendPlaneFill } from 'react-icons/ri'
import { IoMdAttach } from 'react-icons/io'
import { HiPhotograph } from 'react-icons/hi'
import { FaMicrophone } from 'react-icons/fa'

const ChatInput = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  
  return (
    <div className='border-t-2 py-3 px-5'>
      <form onSubmit={handleSubmit} className='flex items-center justify-between'>
        <input type='text' placeholder='Message here ...' className='outline-0 w-full pr-3' />
        <div className='flex items-center'>
          <IoMdAttach className='text-xl text-gray-700 mr-3 cursor-pointer' />
          <HiPhotograph className='text-xl text-gray-700 mr-3 cursor-pointer' />
          <FaMicrophone className='text-xl text-gray-700 mr-3 cursor-pointer' />
          <RiSendPlaneFill className='text-xl text-gray-70 cursor-pointer' />
        </div>
      </form>
    </div>
  )
}

export default ChatInput