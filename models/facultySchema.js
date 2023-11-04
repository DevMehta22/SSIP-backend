const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const facultySchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        minlength: 8,
        required:true
    }
},{timestamps:true})

facultySchema.statics.signup = async function(email,password){
    if(!email || !password){
        throw new Error("Email and Password are required")
    }
    if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password")
    }
    let user = await this.findOne({email});
    if (user) {
        throw new Error("User already exists")
        }
        const salting = await bcrypt.genSalt(10)
        const hashing = await bcrypt.hash(password, salting)
      
        const details = await this.create({
          email,
          password: hashing
        })
      
        return details   
}

facultySchema.statics.login = async function(email,password){
    if (!email || !password) {
        throw Error("please fill all fields")
      }
      const details = await this.findOne({email})
      if (!details) {
        throw Error("Not Authorized")
      }
      const pass = await bcrypt.compare(password, details.password)
      if (!pass) {
        throw Error("Invalid password!")
      }
      
      return details
}

module.exports = mongoose.model("faculty",facultySchema)