import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import message from './messageReducer'

export default combineReducers({
  auth,
  alert,
  message
})