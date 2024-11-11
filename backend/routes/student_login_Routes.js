const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/Student'); // Import the Student model

const router = express.Router();

// Route to handle student login
router.post('/login', async (req, res) => {
  const { prn, password } = req.body;

  try {
    // Step 1: Find the student by PRN
    const student = await Student.findOne({ prn });
    if (!student) {
      return res.status(400).json({ message: 'Invalid PRN or password' });
    }

    // Step 2: Check if the password matches
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid PRN or password' });
    }

    // Step 3: Send a success response on login
    res.status(200).json({ message: 'Login successful', student });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
