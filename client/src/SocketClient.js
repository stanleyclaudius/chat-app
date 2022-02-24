import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from './redux/types/globalTypes'
import { MESSAGE_TYPES } from './redux/types/messageTypes'
import { CONVERSATION_TYPES } from './redux/types/conversationTypes'

const spawnNotification = (body, icon, url, title) => {
  let options = {body, icon}
  let n = new Notification(title, options)
  n.onClick = e => {
    e.preventDefault()
    window.open(url, '_blank')
  }
}

const SocketClient = () => {
  const dispatch = useDispatch()
  const { auth, socket, status, call } = useSelector(state => state)

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
        text: data.text,
        audio: data.audio,
        files: data.files,
        call: data.call
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

      spawnNotification(data.sender.name, data.sender.avatar, 'https://web-inspace.herokuapp.com', 'Inspace')
    })

    return () => socket.off('createMessageToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('typingToClient', data => {
      dispatch({
        type: GLOBAL_TYPES.TYPE,
        payload: data
      })
    })

    return () => socket.off('typingToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('doneTypingToClient', data => {
      dispatch({
        type: GLOBAL_TYPES.TYPE,
        payload: {}
      })
    })

    return () => socket.off('doneTypingToClient')
  }, [dispatch, socket])
  
  useEffect(() => {
    socket.emit('checkUserOnline', {})
  }, [socket, auth])

  useEffect(() => {
    socket.on('checkUserOnlineToClient', data => {
      data.forEach(item => {
        if (!status.includes(item.id) && item.id !== auth.user?._id) {
          dispatch({
            type: GLOBAL_TYPES.ONLINE,
            payload: item.id
          })  
        }
      })
    })

    return () => socket.off('checkUserOnlineToClient')
  }, [dispatch, status, socket, auth.user])

  useEffect(() => {
    socket.on('checkUserOffline', data => {
      dispatch({
        type: GLOBAL_TYPES.OFFLINE,
        payload: data
      })
    })

    return () => socket.off('checkUserOffline')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('readMessageToClient', data => {
      dispatch({
        type: MESSAGE_TYPES.UPDATE_MESSAGE_READ,
        payload: data
      })

      dispatch({
        type: MESSAGE_TYPES.UPDATE_READ_STATUS,
        payload: data.conversation
      })
    })

    return () => socket.off('readMessageToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('callUserToClient', data => {
      dispatch({ type: GLOBAL_TYPES.CALL, payload: data })
    })

    return () => socket.off('callUserToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('userBusy', data => {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: `${call.name} is busy.`
        }
      })
    })

    return () => socket.off('userBusy')
  }, [dispatch, socket, call])

  return (
    <div></div>
  )
}

export default SocketClient