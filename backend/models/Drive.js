const mongoose = require('mongoose');

// Define the Drive Schema
const driveSchema = new mongoose.Schema({
  driveId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  numberOfPersons: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900, // Adjust this range as needed
    max: new Date().getFullYear(), // Current year
  },
  coordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coordinator', // Assuming you have a Coordinator schema
    required: true,
  },
});

// Define the Drive Model
const Drive = mongoose.model('Drive', driveSchema);

module.exports = Drive;
