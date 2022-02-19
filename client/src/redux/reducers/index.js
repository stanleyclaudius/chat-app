import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import conversation from './conversationReducer'
import message from './messageReducer'
import socket from './socketReducer'
import typing from './typeReducer'

export default combineReducers({
  auth,
  alert,
  conversation,
  message,
  socket,
  typing
})