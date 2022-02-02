import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import PageRender from './utils/PageRender'
import Alert from './components/general/Alert'

const App = () => {
  return (
    <Router>
      <Alert />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:id' element={<PageRender />} />
      </Routes>
    </Router>
  )
}

export default App