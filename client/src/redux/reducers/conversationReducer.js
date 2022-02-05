import { CONVERSATION_TYPES } from './../types/conversationTypes'

const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case CONVERSATION_TYPES.GET_CONVERSATION:
      return action.payload
    case CONVERSATION_TYPES.UPDATE_CONVERSATION:
      const conversationData = state.find(item => (
        (item.recipients[0]._id === action.payload.sender._id && item.recipients[1]._id === action.payload.recipient._id) ||
        (item.recipients[0]._id === action.payload.recipient._id && item.recipients[1]._id === action.payload.sender._id)
      ))

      const newConversationData = {
        ...conversationData,
        text: action.payload.text
      }

      const tempState = state.filter(item => item._id !== newConversationData._id)
      return [newConversationData, ...tempState]
    default:
      return state
  }
}

export default conversationReducer