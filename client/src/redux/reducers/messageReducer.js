import { MESSAGE_TYPES } from './../types//messageTypes'

const initialState = {
  data: [],
  result: 0
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.CREATE_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case MESSAGE_TYPES.GET_MESSAGE:
      return action.payload
    case MESSAGE_TYPES.CLEAR_MESSAGE:
      return {
        data: [],
        result: 0
      }
    case MESSAGE_TYPES.UPDATE_MESSAGE_READ:
      return {
        ...state,
        data: state.data.map(item => (item.recipient._id === action.payload.sender) && (item.sender._id === action.payload.recipient) ? {...item, isRead: true} : item)
      }
    case MESSAGE_TYPES.LOAD_MESSAGE:
      return {
        ...state,
        data: [...action.payload.messages.reverse(), ...state.data],
        result: state.result + action.payload.result
      }
    default:
      return state
  }
}

export default messageReducer