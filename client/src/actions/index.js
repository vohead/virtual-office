import axios from "axios";
export const ADDEMAILOBJECT = "add_email_object";
export const SETEMAILOBJECTS = "set_email_objects";
export const ADDSTORYOBJECT = "add_story_object";
export const SETSTORYOBJECTS = "set_story_objects";
export const SETACTIVESTORY = "set_active_story";
export const SETACTIVEMAIL = "set_active_mail";
export const DELETESTORYOBJECT = "delete_story_object";
export const DELETEEMAILOBJECT = "delete_email_object";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const FETCHSTORIES = "fetch_stories";
export const FETCHEMAILS = "fetch_emails";
export const SAVEMAIL = "save_mail";
export const UPDATEMAIL = "update_mail";

export const AddEmailObject = email => {
  return {
    type: ADDEMAILOBJECT,
    payload: email
  };
};
// HALLO
export const SetEmailObjects = emails => {
  return {
    type: SETEMAILOBJECTS,
    payload: emails
  };
};

export const AddStoryObject = story => {
  return {
    type: ADDSTORYOBJECT,
    payload: story
  };
};

export const SetStoryObjects = stories => {
  return {
    type: SETSTORYOBJECTS,
    payload: stories
  };
};

export const SetActiveStory = stories => {
  return {
    type: SETACTIVESTORY,
    payload: stories
  };
};

export const SetActiveMail = emails => {
  return {
    type: SETACTIVEMAIL,
    payload: emails
  };
};

export const DeleteStoryObject = story => {
  return {
    type: DELETESTORYOBJECT,
    payload: story
  };
};

export const DeleteEmailObject = email => {
  return {
    type: DELETEEMAILOBJECT,
    payload: email
  };
};

export const Login = (username, password) => async dispatch => {
  const res = await axios.post("/api/signin/", { username, password });
  dispatch({
    type: LOGIN,
    payload: res.data
  });
};

export const Logout = () => async dispatch => {
  const res = await axios.get("/api/logout");
  dispatch({
    type: LOGOUT,
    payload: res.data
  });
};

export const FetchStories = () => async dispatch => {
  const res = await axios.get("/api/stories");
  dispatch({
    type: FETCHSTORIES,
    payload: res.data
  });
};

export const FetchEmails = () => async dispatch => {
  const res = await axios.get("/api/emails");
  dispatch({
    type: FETCHEMAILS,
    payload: res.data
  });
};

export const SaveMail = email => async dispatch => {
  const res = await axios.post("/api/email", email);
  dispatch({
    type: SAVEMAIL,
    payload: res.data
  });
};

export const UpdateMail = email => async dispatch => {
  const res = await axios.post("/api/email/update", email);
  FetchEmails();
};
