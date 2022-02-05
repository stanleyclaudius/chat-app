import { useSelector } from 'react-redux'
import Message from './Message'

const MessageContainer = ({messages}) => {
  const { auth } = useSelector(state => state)

  return (
    <div className='flex-1 px-5 py-7 overflow-auto message-container'>
      {
        messages.map(item => (
          <Message
            key={item._id}
            type={item.sender._id === auth.user?._id ? 'sender' : 'receiver'}
            message={item.text}
            timestamp={new Date(item.createdAt).toLocaleDateString}
          />
        ))
      }
    </div>
  )
}

export default MessageContainer