import { MESSAGE_TYPES } from './../types/messageTypes'
import { GLOBAL_TYPES } from './../types/globalTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { checkTokenValidity } from './../../utils/checkTokenValidity'

export const getConversation = token => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token
  
  try {
    const res = await getDataAPI('message/conversation', accessToken)
    dispatch({
      type: MESSAGE_TYPES.GET_CONVERSATION,
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

export const createMessage = (chatData, token) => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token

  try {
    const res = await postDataAPI('message', chatData, accessToken)
    dispatch({
      type: MESSAGE_TYPES.CREATE_MESSAGE,
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