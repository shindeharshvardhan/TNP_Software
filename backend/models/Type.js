const mongoose = require('mongoose');

// Define the Type Schema
const typeSchema = new mongoose.Schema({
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  typeName: {
    type: String,
    required: true,
  },
});

// Define the Type Model
const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
