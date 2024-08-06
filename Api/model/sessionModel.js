import sessionSchema from "../schema/sessionSchema.js";

//create
export const createSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};

//read |fetch
export const getSession = (token) => {
  return sessionSchema.findOne({ token });
};
// delete session for logout
export const deleteSession = (accessJWT) => {
  return sessionSchema.findOneAndDelete({ token: accessJWT });
};
