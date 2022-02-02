import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ReduxProvider from './redux/store'
import './index.css'

ReactDOM.render(
  <ReduxProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReduxProvider>,
  document.getElementById('root')
)