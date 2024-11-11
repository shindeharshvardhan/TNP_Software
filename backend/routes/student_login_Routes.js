const express = require('express');
const passport = require('passport');

const router = express.Router();

// Apply CSRF protection to login route
router.post('/login', (req, res, next) => {
  
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
      if (err) return res.status(500).json({ message: 'Error logging in' });
      res.status(200).json({ message: 'Login successful', student });
    });
  })(req, res, next);
});

// Endpoint to check if the student is authenticated
router.get('/auth-status', (req, res) => {
  res.json({  // Use res.json here instead of res.join
    isAuthenticated: req.isAuthenticated(),
  });
});

const ensureAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.status(401).json({ message: "Unauthorized Access "});
};

router.get("/protected-data", ensureAuthenticated, (req, res) => {
  res.json({ message: "This is protected data, accessible only if logged in." });
});


module.exports = router;
