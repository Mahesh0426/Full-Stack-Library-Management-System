import userSchema from "../schema/userSchema.js";

// Create a user
export const createUser = (userObj) => {
  return userSchema(userObj).save();
};

// find user by email
export const findUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

// update users refresh token
export const updateRefreshJWT = (email, refreshJwt) => {
  return userSchema.findOneAndUpdate({ email }, { refreshJwt });
};
