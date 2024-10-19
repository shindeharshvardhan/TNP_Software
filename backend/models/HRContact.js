const mongoose = require('mongoose');

// Define the HRContact Schema
const hrContactSchema = new mongoose.Schema({
  hrName: {
    type: String,
    required: true,
  },
  hrMobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  hrEmail: {
    type: String,
    required: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  yearOfApproach: {
    type: Number,
    required: true,
    min: 1900, // Adjust this range as needed
    max: new Date().getFullYear(), // Current year
  },
});

// Define the HRContact Model
const HRContact = mongoose.model('HRContact', hrContactSchema);

module.exports = HRContact;
