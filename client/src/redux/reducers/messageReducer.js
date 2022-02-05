import { MESSAGE_TYPES } from './../types//messageTypes'

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case MESSAGE_TYPES.CREATE_MESSAGE:
      return [...state, action.payload]
    case MESSAGE_TYPES.GET_MESSAGE:
      return action.payload
    case MESSAGE_TYPES.CLEAR_MESSAGE:
      return []
    default:
      return state
  }
}

export default messageReducer