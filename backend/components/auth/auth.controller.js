const AuthService = require("./auth.service");
exports.login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
