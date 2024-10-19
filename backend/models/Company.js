const mongoose = require('mongoose');

// Define the Company Schema
const companySchema = new mongoose.Schema({
  compId: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  departments: {
    type: [String],
    enum: ['Comp-Sci', 'MCA', 'Others'], // Add more department names as needed
    required: true,
  },
  hrContacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HRContact',
  }],
});

// Define the Company Model
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
