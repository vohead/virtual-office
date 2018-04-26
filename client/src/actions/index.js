export const ADDEMAILOBJECT = 'add_email_object';
export const SETEMAILOBJECTS = 'set_email_objects';
export const ADDSTORYOBJECT = 'add_story_object';
export const SETSTORYOBJECTS = 'set_story_objects';
export const SETACTIVESTORY = 'set_active_story';
export const SETACTIVEMAIL = 'set_active_mail';
export const DELETESTORYOBJECT = 'delete_story_object';

export const AddEmailObject = (email) => {
	return {
		type: ADDEMAILOBJECT,
		payload: email
	};
};

export const SetEmailObjects = (emails) => {
	return {
		type: SETEMAILOBJECTS,
		payload: emails
	};
};

export const AddStoryObject = (story) => {
	return {
		type: ADDSTORYOBJECT,
		payload: story
	};
};

export const SetStoryObjects = (stories) => {
	return {
		type: SETSTORYOBJECTS,
		payload: stories
	};
};

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
	}
} 
