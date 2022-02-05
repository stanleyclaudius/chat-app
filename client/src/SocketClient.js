import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SocketClient = () => {
  const { auth, socket } = useSelector(state => state)

  useEffect(() => {
    socket.emit('joinUser', auth.user)
  }, [socket, auth.user])

  return (
    <div></div>
  )
}

export default SocketClient