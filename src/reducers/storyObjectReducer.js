import {ADDSTORYOBJECT, SETSTORYOBJECTS} from '../actions'

export default (state = [], action) => {
  switch (action.type) {

  case ADDSTORYOBJECT:
    return [...state, action.payload]
  case SETSTORYOBJECTS:
    return action.payload
  default:
    return state
  }
}
