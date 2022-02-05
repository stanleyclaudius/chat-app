import { MESSAGE_TYPES } from './../types//messageTypes'

const initialState = {
  users: [],
  data: []
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.GET_CONVERSATION:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}

export default messageReducer