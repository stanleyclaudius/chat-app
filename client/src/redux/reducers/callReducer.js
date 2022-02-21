import { GLOBAL_TYPES } from './../types/globalTypes'

const callReducer = (state = null, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.CALL:
      return action.payload
    default:
      return state
  }
}

export default callReducer