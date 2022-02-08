import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MESSAGE_TYPES } from './redux/types/messageTypes'
import { CONVERSATION_TYPES } from './redux/types/conversationTypes'

const SocketClient = () => {
  const dispatch = useDispatch()
  const { auth, socket } = useSelector(state => state)

  useEffect(() => {
    socket.emit('joinUser', auth.user)
  }, [socket, auth.user])

  useEffect(() => {
    socket.on('createMessageToClient', data => {
      const addConversationData = {
        senderId: data.sender._id,
        senderName: data.sender.name,
        senderAvatar: data.sender.avatar,
        recipientId: data.recipient._id,
        recipientName: data.recipient.name,
        recipientAvatar: data.recipient.avatar,
        media: data.media,
        createdAt: data.createdAt,
        text: data.text
      }

      dispatch({
        type: CONVERSATION_TYPES.ADD_CONVERSATION,
        payload: addConversationData
      })

      dispatch({
        type: MESSAGE_TYPES.CREATE_MESSAGE,
        payload: data
      })

      dispatch({
        type: CONVERSATION_TYPES.UPDATE_CONVERSATION,
        payload: data
      })
    })

    return () => socket.off('createMessageToClient')
  }, [dispatch, socket])

  return (
    <div></div>
  )
}

export default SocketClient