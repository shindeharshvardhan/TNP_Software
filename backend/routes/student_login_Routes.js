const express = require('express');
const passport = require('passport');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection to login route
router.post('/login', csrfProtection, (req, res, next) => {
  // Log received CSRF token for debugging
  console.log('Received CSRF Token:', req.headers['csrf-token']);
  
  // Authenticate the user with Passport
  passport.authenticate('local', (err, student, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    if (!student) {
      return res.status(400).json({ message: info.message });
    }

    // Log the user in
    req.login(student, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in' });
      }

      // Successful login, respond with student data
      res.status(200).json({ message: 'Login successful', student });
    });
  })(req, res, next);
});

// New endpoint to check if the student is authenticated
router.get('/auth-status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true, student: req.user });
  }
  return res.status(200).json({ isAuthenticated: false });
});

// Error handler for CSRF token mismatch
router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ message: 'Form tampered with' });
  } else {
    next(err);
  }
});

module.exports = router;
