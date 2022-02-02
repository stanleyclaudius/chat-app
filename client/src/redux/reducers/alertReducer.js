import { GLOBAL_TYPES } from './../types/globalTypes'

const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.ALERT:
      return action.payload
    default:
      return state
  }
}

export default alertReducer