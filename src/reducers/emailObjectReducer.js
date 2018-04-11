import {ADDEMAILOBJECT, SETEMAILOBJECTS} from '../actions'

export default (state = [], action) => {
  switch (action.type) {

  case ADDEMAILOBJECT:
    return [...state, action.payload]
    break;
  case SETEMAILOBJECTS:
    return action.payload
    break;
  default:
    return state
  }
}
