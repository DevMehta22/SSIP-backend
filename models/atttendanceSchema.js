const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    classId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'classRoom', 
        required: true },
    personalAttendance: [PersonalAttendanceSchema], // List of personal attendance records
    date: { 
        type: Number,
        required: true },
    validityTimePeriod: { 
        type: Number, 
        required: true }, // Time period in minutes
    teacherLocation: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;