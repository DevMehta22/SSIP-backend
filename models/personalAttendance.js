const mongoose = require('mongoose');

const PersonalAttendanceSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  isPresent: { type: Boolean, required: true },
});

const PersonalAttendance = mongoose.model('PersonalAttendance', PersonalAttendanceSchema);

module.exports = PersonalAttendance;