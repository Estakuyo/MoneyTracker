const db = require("../config/db_connection");

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const registerQuery =
      "INSERT INTO users(email, username, password) VALUES (?, ?, ?)";
    const [result] = await db.execute(registerQuery, [
      email,
      username,
      password,
    ]);
    return res.status(200).json({ result, email, username });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const loginQuery =
      "SELECT * FROM users WHERE username = ? AND password = ?";
    const [result] = await db.execute(loginQuery, [username, password]);
    return res.status(200).json({ result });
  } catch (err) {
    res.status(500).json(err);
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout Controller" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login, logout };
