require("dotenv").config()
const express = require('express')
const mongoose = require("mongoose")
const requestIp = require('request-ip')
const app = express()
const routerstudent = require('./routes/studentroutes')
const routerfaculty = require('./routes/facultyroutes')
app.use(express.json())
app.use(requestIp.mw());
app.use('/api/student',routerstudent)
app.use('/api/faculty',routerfaculty)


mongoose.connect(process.env.MONGO_URI).then(()=>{
   console.log("Connected to DB")
   const port = process.env.PORT || 5500
   app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${port}`)
    }
   )
}).catch((err)=>{
    console.log(err.message)
})