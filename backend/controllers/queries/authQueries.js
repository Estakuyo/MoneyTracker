const db = require("../../config/db_connection");

const accountExists = async (username, email) => {
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";
  const [result] = await db.execute(query, [username, email]);
  return result;
};

const loginAccount = async (username) => {
  const query = "SELECT * FROM users WHERE username = ?";
  const [result] = await db.execute(query, [username]);
  return result;
};

const registerAccount = async (email, username, password) => {
  const query = "INSERT INTO users(email, username, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(query, [email, username, password]);
  return result;
};

module.exports = { accountExists, loginAccount, registerAccount };
