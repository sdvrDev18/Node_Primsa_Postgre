import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 7);
};

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};
