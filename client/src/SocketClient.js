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