const mongoose = require('mongoose');

// Define the PlacementData Schema
const placementDataSchema = new mongoose.Schema({
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
  offerLetter: {
    type: String, // URL or path to the offer letter document
    required: true,
  },
  ctc: {
    type: Number, // Cost to Company (CTC) in currency units
    required: true,
  },
  placementDate: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});

// Define the PlacementData Model
const PlacementData = mongoose.model('PlacementData', placementDataSchema);

module.exports = PlacementData;
