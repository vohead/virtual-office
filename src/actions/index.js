export const ADDEMAILOBJECT = "add_email_object";
export const SETEMAILOBJECTS = "set_email_objects";
export const ADDSTORYOBJECT = "add_story_object";
export const SETSTORYOBJECTS = "set_story_objects";

export const AddEmailObject = (email) => {
  
  return {
    type: ADDEMAILOBJECT,
    payload: email
  }
}

export const SetEmailObjects = (emails) => {
  return {
    type: SETEMAILOBJECTS,
    payload: emails
  }
}

export const AddStoryObject = (story) => {
  return {
    type: ADDSTORYOBJECT,
    payload: story
  }
}

export const SetStoryObjects = (stories) => {
  return {
    type: SETSTORYOBJECTS,
    payload: stories
  }
}

