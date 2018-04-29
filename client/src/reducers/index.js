import { combineReducers } from 'redux';
import emailObjectReducer from './emailObjectReducer';
import storyObjectReducer from './storyObjectReducer';
import activeStoryReducer from './activeStoryReducer';
import activeMailReducer from './activeMailReducer';
import authReducer from './authReducer';
import '../styles.css';

export default combineReducers({
	emailObjects: emailObjectReducer,
	storyArray: storyObjectReducer,
	activeStory: activeStoryReducer,
	activeMail: activeMailReducer,
	auth: authReducer
});
