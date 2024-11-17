// passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('./models/Student');
const StudentCoordinator = require('./models/studentc'); // Assuming this is a model

// Passport Local Strategy for Student
passport.use('student', new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    // Add logic to find and authenticate the student
    Student.findOne({ email: email }, (err, student) => {
      if (err) return done(err);
      if (!student || !student.verifyPassword(password)) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, student);
    });
  }
));

// Passport Local Strategy for Student Coordinator
passport.use('coordinator', new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    // Add logic to find and authenticate the student coordinator
    StudentCoordinator.findOne({ email: email }, (err, coordinator) => {
      if (err) return done(err);
      if (!coordinator || !coordinator.verifyPassword(password)) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, coordinator);
    });
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  Student.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
