const mongoose = require('mongoose');

const coordinatorSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  year: Number,  // The year this coordinator is for
  isLocked: { type: Boolean, default: false },  // If this year's coordinators are locked
  password: String  // Store the generated password
});

const FacultyCoordinator = mongoose.model('FacultyCoordinator', coordinatorSchema);
module.exports = FacultyCoordinator;
