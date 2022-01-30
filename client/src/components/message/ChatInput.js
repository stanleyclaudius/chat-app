import { RiSendPlaneFill } from 'react-icons/ri'

const ChatInput = () => {
  return (
    <div className='flex items-center justify-between'>
      <input type='text' placeholder='Message here ...' className='outline-0 w-full pr-3' />
      <RiSendPlaneFill className='text-xl text-gray-500' />
    </div>
  )
}

export default ChatInput