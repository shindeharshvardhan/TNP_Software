const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('bachelorsData').populate('results');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('bachelorsData').populate('results');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

exports.createStudent = async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json({ message: "Student created successfully", student });
    } catch (error) {
      console.error("Error creating student:", error); // This will log the actual error to the console
      res.status(500).json({ message: "Error creating student", error: error.message });
    }
  };
  

// Update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};
