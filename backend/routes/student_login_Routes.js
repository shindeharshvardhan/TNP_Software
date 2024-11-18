const express = require('express');
const passport = require('../config/passportConfig'); // Passport configuration
const router = express.Router();

// Student login route
router.post('/login', (req, res, next) => {
  passport.authenticate('student-login', (err, student, info) => {
    if (err) {
      console.error("Error during authentication: ", err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (!student) {
      return res.status(400).json({ message: info?.message || 'Invalid credentials' });
    }

    // Log the user in
    req.login(student, (err) => {
      if (err) {
        console.error("Error during login: ", err);
        return res.status(500).json({ message: 'Error logging in' });
      }

      res.cookie('isStudentAuthenticated', true, {
        httpOnly: true, // Ensures the cookie is only sent via HTTP(S), not accessible via JavaScript
        secure: false, // Only secure in production
        sameSite: 'Lax', // Prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.cookie('studentPrn', student.prn, {
        httpOnly: false, // Accessible via JavaScript (to read in context)
        secure: false, // Only secure in production
        sameSite: 'Lax', // Prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      console.log("Successfully logged in", student);
      res.status(200).json({ message: 'Login successful', student });
    });
  })(req, res, next);
});

// Endpoint to check if the student is authenticated
router.get('/auth-status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      studentPrn: req.user.prn,  // Send the student's PRN
    });
  }
  
  return res.json({
    isAuthenticated: false,
  });
});

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized Access' });
};

// Example protected route
router.get('/protected-data', ensureAuthenticated, (req, res) => {
  res.json({ message: 'This is protected data, accessible only if logged in.' });
});

module.exports = router;
