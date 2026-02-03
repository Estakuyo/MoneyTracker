const {
  accountExists,
  loginAccount,
  registerAccount,
} = require("./queries/authQueries");
const { signToken, verfiyToken } = require("../helpers/jwt");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const users = await accountExists(username, email);
    if (users.length > 0) {
      return res.status(401).json({ error: "Account already exists" });
    }
    const hashedPassword = await hashPassword(password);

    const user = registerAccount(email, username, hashedPassword);
    return res.status(200).json({ user, message: "Registered Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const users = await loginAccount(username);
    if (users.length === 0) {
      return res.status(401).json({ error: "Account does not exists" });
    }

    const user = users[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Credentials" });
    }

    const token = signToken(user);
    return res
      .status(200)
      .json({ user, token, message: "Logged In Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
