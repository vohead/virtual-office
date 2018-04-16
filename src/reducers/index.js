import {combineReducers} from 'redux';
import emailObjectReducer from './emailObjectReducer';
import storyObjectReducer from './storyObjectReducer';
import "../styles.css";

export default combineReducers({
  emailObjects: emailObjectReducer,
  storyObjects: storyObjectReducer
})