export const ADDEMAILOBJECT = "add_email_object";
export const SETEMAILOBJECTS = "set_email_objects";

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
