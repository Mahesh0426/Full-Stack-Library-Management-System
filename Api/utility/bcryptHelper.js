import bcrypt from "bcryptjs";

const salt = 15;
export const hashPassword = (plainPassword) => {
  const hashPassword = bcrypt.hashSync(plainPassword, salt);
  return hashPassword;
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
