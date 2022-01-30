import { RiSendPlaneFill } from 'react-icons/ri'
import { IoMdAttach } from 'react-icons/io'
import { HiPhotograph } from 'react-icons/hi'

const ChatInput = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-between'>
      <input type='text' placeholder='Message here ...' className='outline-0 w-full pr-3' />
      <div className='flex items-center'>
        <IoMdAttach className='text-xl text-gray-700 mr-3' />
        <HiPhotograph className='text-xl text-gray-700 mr-3' />
        <RiSendPlaneFill className='text-xl text-gray-70' />
      </div>
    </form>
  )
}

export default ChatInput