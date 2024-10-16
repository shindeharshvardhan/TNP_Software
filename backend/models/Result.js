const mongoose = require('mongoose');

// Define the Result Schema
const resultSchema = new mongoose.Schema({
  resultId: {
    type: String,
    required: true,
    unique: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  semNo: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  resultDoc: {
    data: Buffer, // Store the document as binary data
    contentType: String, // MIME type of the document (e.g., 'application/pdf')
    required: true,
  },
  atkt: {
    type: Boolean,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
});

// Define the Result Model
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
