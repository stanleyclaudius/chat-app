import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import conversation from './conversationReducer'
import message from './messageReducer'
import socket from './socketReducer'
import typing from './typeReducer'
import status from './statusReducer'
import call from './callReducer'
import peer from './peerReducer'

export default combineReducers({
  auth,
  alert,
  conversation,
  message,
  socket,
  typing,
  status,
  call,
  peer
})