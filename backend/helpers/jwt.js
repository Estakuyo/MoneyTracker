const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyToken = (signedToken) => {
  const token = jwt.verify(signedToken, process.env.JWT_SECRET);
  return token;
};

module.exports = { signToken, verifyToken };
