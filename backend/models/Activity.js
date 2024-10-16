const mongoose = require('mongoose');

// Define the Activity Schema
const activitySchema = new mongoose.Schema({
  driveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drive',
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  numberOfCandidates: {
    type: Number,
    required: true,
  },
  photos: [{
    type: String, // URL or path to photos
  }],
});

// Define the Activity Model
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
