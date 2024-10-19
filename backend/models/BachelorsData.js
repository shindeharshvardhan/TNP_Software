const mongoose = require('mongoose');

// Define the BachelorsData Schema
const bachelorsDataSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    unique: true,
  },
  passingYear: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  s1: {
    type: Number,
  },
  s2: {
    type: Number,
  },
  s3: {
    type: Number,
  },
  s4: {
    type: Number,
  },
  s5: {
    type: Number,
  },
  s6: {
    type: Number,
  },
  s7: {
    type: Number,
  },
  s8: {
    type: Number,
  },
});

// Define the BachelorsData Model
const BachelorsData = mongoose.model('BachelorsData', bachelorsDataSchema);

module.exports = BachelorsData;
