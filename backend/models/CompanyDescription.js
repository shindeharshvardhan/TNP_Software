const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyDescriptionSchema = new Schema({
  programs: [String],
  selectedDepartments: [String],
  eligibilityCriteria: {
    UG: String,
    customUGEligibility: String,
    PG: String,
    customPGEligibility: String,
    tenthEligibility: String,
    customTenthEligibility: String,
    twelfthEligibility: String,
    customTwelfthEligibility: String,
  },
  jobDetails: {
    jobRole: String,
    applicationDeadline: Date,
    ctc: Number,
    bond: Number,
    location: String,
  },
  internshipDetails: {
    isOffered: Boolean,
    duration: Number,
    stipend: Number,
  },
  trainingDetails: {
    isOffered: Boolean,
    duration: Number,
    stipend: Number,
  },
  otherDetails: String
}, {
  timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
});

const CompanyDescription = mongoose.model('CompanyDescription', companyDescriptionSchema);

module.exports = CompanyDescription;
