import { CONVERSATION_TYPES } from './../types/conversationTypes'

const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case CONVERSATION_TYPES.GET_CONVERSATION:
      return action.payload
    default:
      return state
  }
}

export default conversationReducer