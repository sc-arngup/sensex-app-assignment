const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "mysecret";
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: "Token missing" });
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
