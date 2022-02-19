import { GLOBAL_TYPES } from './../types/globalTypes'

const typeReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.TYPE:
      return action.payload
    default:
      return state
  }
}

export default typeReducer