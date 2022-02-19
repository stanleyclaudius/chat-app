import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'

const MessageContainer = ({ messages }) => {
  const { auth, typing } = useSelector(state => state)

  const messageContainerRef = useRef()

  useEffect(() => {
    if (messageContainerRef) {
      messageContainerRef.current.addEventListener('DOMNodeInserted', e => {
        const { currentTarget: target } = e
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
      })
    }
  })

  // useEffect(() => {
  //   if (selectContact && selectContact._id !== auth.user?._id) {
  //     socket.emit('readMessage', {
  //       recipient: auth.user?._id,
  //       conversation: messages[0]?.conversation
  //     })
  //   }
  // }, [auth.user?._id, messages, selectContact, socket])

  return (
    <div className='flex-1 px-5 py-7 overflow-auto message-container' ref={messageContainerRef}>
      {
        messages.map((item, idx) => (
          <Message
            key={idx}
            type={item.sender._id === auth.user?._id ? 'sender' : 'receiver'}
            sender={item.sender}
            recipientAvatar={item.sender?.avatar}
            message={item.text}
            media={item.media}
            audio={item.audio}
            files={item.files}
            isRead={item.isRead}
            timestamp={new Date(item.createdAt).toLocaleString()}
          />
        ))
      }
      <p className='animate-bounce'>{typing.message && typing.message}</p>
    </div>
  )
}

export default MessageContainer