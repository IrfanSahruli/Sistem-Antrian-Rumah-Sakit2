const jwt = require("jsonwebtoken");

const SECRET_KEY = "irfan266";

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Login dulu guys" });
  }
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token tidak valid" });
  }
};

module.exports = verifyToken;
