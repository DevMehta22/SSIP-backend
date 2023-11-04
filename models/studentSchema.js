const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
    student_rollno:{
        type:String,
        required:true,
        unique: true
    },
    student_email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      student_password: {
        type: String,
        required: true,
        minlength: 8
      }
    },{timestamps:true}
    
)

studentSchema.statics.signup = async function(student_rollno,student_email, student_password){
    //validation
  
    if (!student_email || !student_password) {
      throw Error("please fill all fields")
    }
    if (!validator.isEmail(student_email)) {
      throw Error("Enter valid Email")
    }
    if (!validator.isStrongPassword(student_password)) {
      throw Error("password is not strong enough")
    }
  
    const PreExist = await this.findOne({ student_email })
  
    if (PreExist) {
      throw Error("Email already exist in DB!")
    }
  
    const salting = await bcrypt.genSalt(10)
    const hashing = await bcrypt.hash(student_password, salting)
  
    const student = await this.create({
      student_rollno,  
      student_email,
      student_password: hashing
    })
  
    return student
  }
  
  //login
  
  studentSchema.statics.login = async function(student_rollno,student_email, student_password){
    if (!student_email || !student_password || !student_rollno) {
      throw Error("please fill all fields")
    }
    const student = await this.findOne({ student_email })
    if (!student) {
      throw Error("Email not found!")
    }
    const pass = await bcrypt.compare(student_password, student.student_password)
    if (!pass) {
      throw Error("Invalid password!")
    }
  
    return student
  }
  
  module.exports = mongoose.model("student", studentSchema)
  