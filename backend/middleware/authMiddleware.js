const { verifyToken } = require("../helpers/jwt");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = verifyToken(token);

    req.user = decodedToken;
    return next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = authMiddleware;
