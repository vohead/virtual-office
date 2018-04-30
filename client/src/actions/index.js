import axios from 'axios';
export const SETACTIVESTORY = 'set_active_story';
export const SETACTIVEMAIL = 'set_active_mail';
export const DELETESTORYOBJECT = 'delete_story_object';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const FETCHSTORIES = 'fetch_stories';
export const SAVESTORY = 'save_story';
export const UPDATESTORY = 'update_story';
export const DELETESTORY = 'delete_story';
export const FETCHEMAILS = 'fetch_emails';
export const SAVEMAIL = 'save_mail';
export const UPDATEMAIL = 'update_mail';
export const DELETEMAIL = 'delete_mail';

export const SetActiveStory = (stories) => {
	return {
		type: SETACTIVESTORY,
		payload: stories
	};
};

export const SetActiveMail = (emails) => {
	return {
		type: SETACTIVEMAIL,
		payload: emails
	};
};

export const DeleteStoryObject = (story) => {
	return {
		type: DELETESTORYOBJECT,
		payload: story
	};
};

export const Login = (username, password) => async (dispatch) => {
	const res = await axios.post('/api/signin/', { username, password });
	dispatch({
		type: LOGIN,
		payload: res.data
	});
};

export const Logout = () => async (dispatch) => {
	const res = await axios.get('/api/logout');
	dispatch({
		type: LOGOUT,
		payload: res.data
	});
};

export const FetchStories = () => async (dispatch) => {
	const res = await axios.get('/api/stories');
	dispatch({
		type: FETCHSTORIES,
		payload: res.data
	});
};

export const SaveStory = (story) => async (dispatch) => {
	const res = await axios.post('/api/story', story);
	dispatch({
		type: SAVESTORY,
		payload: res.data
	});
};

export const UpdateStory = (story) => async (dispatch) => {
	const res = await axios.put('/api/story', story);
	dispatch({
		type: UPDATESTORY,
		payload: res.data
	});
};

export const DeleteStory = (story) => async (dispatch) => {
	await axios.delete(`/api/story/${story._id}`);

	dispatch({
		type: DELETESTORY,
		payload: story._id
	});
};

export const FetchEmails = () => async (dispatch) => {
	const res = await axios.get('/api/emails');
	dispatch({
		type: FETCHEMAILS,
		payload: res.data
	});
};

export const SaveMail = (email) => async (dispatch) => {
	const res = await axios.post('/api/email', email);
	dispatch({
		type: SAVEMAIL,
		payload: res.data
	});
};

export const UpdateMail = (email) => async (dispatch) => {
	const res = await axios.put('/api/email', email);
	dispatch({
		type: UPDATEMAIL,
		payload: res.data
	});
};

export const DeleteMail = (email) => async (dispatch) => {
	await axios.delete(`/api/email/${email._id}`);

	dispatch({
		type: DELETEMAIL,
		payload: email._id
	});
};
