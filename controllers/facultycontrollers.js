const jwt = require("jsonwebtoken");
const Details = require("../models/facultySchema");

const genToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "2d" });
};

const signup = async (req, res) => {
  const { email,password } = req.body
  try {
    const user = await Details.signup(email,password);
    const token = genToken(user._id);
    res.status(200).json({email, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const login= async (req, res) => {
  const {email,password} = req.body
  try {
      const user = await Details.login(email,password);
      const token = genToken(user._id);
      res.status(200).json({email,token})
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  login,
  signup,
};