import { useSelector } from 'react-redux'
import Message from './Message'

const MessageContainer = ({messages}) => {
  const { auth } = useSelector(state => state)

  return (
    <div className='flex-1 px-5 py-7 overflow-auto message-container'>
      {
        messages.map((item, idx) => (
          <Message
            key={idx}
            type={item.sender._id === auth.user?._id ? 'sender' : 'receiver'}
            recipientAvatar={item.sender?.avatar}
            message={item.text}
            timestamp={new Date(item.createdAt).toLocaleString()}
          />
        ))
      }
    </div>
  )
}

export default MessageContainer