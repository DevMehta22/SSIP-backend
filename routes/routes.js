const express = require('express');
const router = express.Router();

// Define routes and their associated controller methods here
router.post('/create-class', createClassController.create);
router.post('/mark-attendance', markAttendanceController.mark);
router.get('/get-students', getStudentsController.get);