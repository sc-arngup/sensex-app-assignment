const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET || "mysecret";
exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  return token;
};
