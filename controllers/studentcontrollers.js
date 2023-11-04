// const jwt = require("jsonwebtoken");
const Student = require("../models/studentSchema");
// const requestIp = require('request-ip')

// const genToken = (_id) => {
//   return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "2d" });
// };

const signupStd = async (req, res) => {
  const { student_rollno, student_email,student_password } = req.body
  
  try {
    const std = await Student.signup(student_rollno,student_email,student_password);
    // const token = genToken(std._id);
    res.status(200).json({ student_rollno,student_email });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const loginStd = async (req, res) => {
    const {student_rollno,student_email,student_password } = req.body

  try {
    const std = await Student.login(student_rollno,student_email,student_password);
    // const token = genToken(std._id);
    res.status(200).json({student_rollno,student_email });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  loginStd,
  signupStd,
};
