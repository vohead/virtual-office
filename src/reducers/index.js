import {combineReducers} from 'redux';
import emailObjectReducer from './emailObjectReducer';
import "../styles.css";

export default combineReducers({
  emailObjects: emailObjectReducer
})