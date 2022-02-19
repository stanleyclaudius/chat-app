import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from './redux/types/globalTypes'
import { refreshToken } from './redux/actions/authActions'
import io from 'socket.io-client'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import PageRender from './utils/PageRender'
import Alert from './components/general/Alert'
import SocketClient from './SocketClient'

const App = () => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({ type: GLOBAL_TYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])

  return (
    <Router>
      <Alert />
      { auth.token && <SocketClient /> }
      <Routes>
        <Route path='/' element={auth.user ? <Dashboard /> : <Login />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:id' element={<PageRender />} />
      </Routes>
    </Router>
  )
}

export default App