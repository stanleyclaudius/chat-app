import { MESSAGE_TYPES } from './../types/messageTypes'
import { CONVERSATION_TYPES } from './../types/conversationTypes'
import { GLOBAL_TYPES } from './../types/globalTypes'
import { getDataAPI, postDataAPI, patchDataAPI } from './../../utils/fetchData'
import { checkTokenValidity } from './../../utils/checkTokenValidity'

export const getConversation = token => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token
  
  try {
    const res = await getDataAPI('message/conversation', accessToken)
    dispatch({
      type: CONVERSATION_TYPES.GET_CONVERSATION,
      payload: res.data.conversation
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const getMessages = (id, token) => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token

  try {
    const res = await getDataAPI(`message/${id}`, accessToken)
    dispatch({
      type: MESSAGE_TYPES.GET_MESSAGE,
      payload: {
        data: res.data.messages.reverse(),
        result: res.data.result
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const createMessage = (chatData, token, socket) => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token

  socket.emit('createMessage', chatData)

  try {
    await postDataAPI('message', {
      ...chatData,
      sender: chatData.sender._id,
      recipient: chatData.recipient._id
    }, accessToken)

    dispatch({
      type: MESSAGE_TYPES.CREATE_MESSAGE,
      payload: chatData
    })

    dispatch({
      type: CONVERSATION_TYPES.UPDATE_CONVERSATION,
      payload: chatData
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const updateReadStatus = (id, senderId, token, socket) => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token

  try {
    const res = await patchDataAPI(`message/update/${id}`, {}, accessToken)
    dispatch({
      type: MESSAGE_TYPES.UPDATE_READ_STATUS,
      payload: res.data.conversation
    })

    socket.emit('readMessage', {
      recipient: id,
      sender: senderId,
      conversation: res.data.conversation
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: err.response.data.msg
    })
  }
}