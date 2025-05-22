const jwt = require("jsonwebtoken");
const privateKey = require('./index');

const authMidlleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Accès non autorisé. Token maquant" });
  }

  try {
    const decoded = jwt.verify(token , privateKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token manquant non invalid ou expiré" });
  }
};

module.exports = authMidlleware;
