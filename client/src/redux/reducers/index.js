import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import conversation from './conversationReducer'
import message from './messageReducer'

export default combineReducers({
  auth,
  alert,
  conversation,
  message
})