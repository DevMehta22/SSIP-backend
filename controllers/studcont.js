const Student = require("../models/studentSchema");
const requestIp = require('request-ip');

const signupStd = async (req, res) => {
  const { student_rollno, student_email, student_password } = req.body;

  try {
    await Student.signup(student_rollno, student_email, student_password);
    res.status(200).json({ student_rollno, student_email, message: "Student registered successfully" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const loginStd = async (req, res) => {
  const { student_rollno, student_email, student_password } = req.body;

  try {
    await Student.login(student_rollno, student_email, student_password);
    res.status(200).json({ student_rollno, student_email, message: "Login successful" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  loginStd,
  signupStd,
};
