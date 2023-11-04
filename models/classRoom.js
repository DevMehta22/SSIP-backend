const ClassSchema = new mongoose.Schema({
    classId: { 
        type: String, 
        default: () => new mongoose.Types.ObjectId() },
    name: { 
        type: String, 
        required: true },
    facultyEmail: { 
        type: String, 
        required: true },
    attendance: [AttendanceSchema],
    students: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student' }],
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;