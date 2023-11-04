const createClassController = {
  create: async (req, res) => {
    // Parse request data and create a new class document
    const { name, facultyEmail, students } = req.body;
    try {
      const newClass = new Class({ name, facultyEmail, students });
      await newClass.save();
      res.json(newClass);
    } catch (error) {
      res.status(500).json({ error: 'Class creation failed.' });
    }
  },
};

const Attendance = require('../models/attendance'); // Import your Attendance model

const markAttendanceController = {
  mark: async (req, res) => {
    try {
      // Parse request data, such as classId, studentId, and attendance data
      const { classId, studentId, date, isPresent, longitude, latitude } = req.body;

      // Find the class's attendance record for the given date
      const attendanceRecord = await Attendance.findOne({
        classId: classId,
        date: date,
      });

      if (!attendanceRecord) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }

      // Find the student's personal attendance record or create a new one
      const studentAttendance = attendanceRecord.personalAttendance.find(
        (record) => record.studentId === studentId
      );

      if (!studentAttendance) {
        attendanceRecord.personalAttendance.push({
          studentId: studentId,
          isPresent: isPresent,
          longitude: longitude,
          latitude: latitude,
        });
      } else {
        studentAttendance.isPresent = isPresent;
        studentAttendance.longitude = longitude;
        studentAttendance.latitude = latitude;
      }

      // Save the updated attendance record
      await attendanceRecord.save();

      res.json(attendanceRecord);
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark attendance' });
    }
  },
};

module.exports = markAttendanceController;

const Student = require('../models/student'); // Import your Student model

const getStudentsController = {
  get: async (req, res) => {
    try {
      // Retrieve a list of students from the database
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve students' });
    }
  },
};

module.exports = getStudentsController;

