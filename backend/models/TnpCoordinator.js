const mongoose = require('mongoose');

const tnpCoordinatorSchema = new mongoose.Schema({
  coordinatorId: {
    type: String,
    required: true,
    unique: true, // Ensures that each coordinator has a unique ID
  },
  name: {
    type: String,
    required: true,
    trim: true, // Removes any extra spaces from the name
  },
  higherEducation: {
    type: String,
    enum: ['BE', 'BARCH', 'MSC', 'MCA', 'ME', 'MURP'], // Accepts only these values
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    lowercase: true, // Converts email to lowercase
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email validation
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], // Validates 10-digit phone numbers
  },
});

const TnpCoordinator = mongoose.model('TnpCoordinator', tnpCoordinatorSchema);

module.exports = TnpCoordinator;
