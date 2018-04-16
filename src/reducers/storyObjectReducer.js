import {ADDSTORYOBJECT, SETSTORYOBJECTS} from '../actions'

export default (state = [], action) => {
  switch (action.type) {

  case ADDSTORYOBJECT:
    return [...state, action.payload]
    break;
  case SETSTORYOBJECTS:
    return action.payload
    break;
  default:
    return state
  }
}
