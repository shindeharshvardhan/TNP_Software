const mongoose = require('mongoose');

// Define the Application Schema
const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Rejected', 'Accepted'], // Add more statuses if needed
    required: true,
  },
  appliedDate: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});

// Define the Application Model
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
