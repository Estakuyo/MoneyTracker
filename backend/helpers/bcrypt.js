const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const unhashedPassword = await bcrypt.compare(password, hashedPassword);
  return unhashedPassword;
};

module.exports = { hashPassword, comparePassword };
