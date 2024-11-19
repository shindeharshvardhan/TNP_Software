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
  otherDetails: String,
  requiredFields: {
    firstName: { type: Boolean, default: false },
    middleName: { type: Boolean, default: false },
    lastName: { type: Boolean, default: false },
    tenthPercentage: { type: Boolean, default: false },
    twelfthPercentageOrDiploma: { type: Boolean, default: false },
    ugSemesters: {
      sem1: { type: Boolean, default: false },
      sem2: { type: Boolean, default: false },
      sem3: { type: Boolean, default: false },
      sem4: { type: Boolean, default: false },
      sem5: { type: Boolean, default: false },
      sem6: { type: Boolean, default: false },
      sem7: { type: Boolean, default: false },
      sem8: { type: Boolean, default: false },
    },
    pgSemesters: {
      sem1: { type: Boolean, default: false },
      sem2: { type: Boolean, default: false },
      sem3: { type: Boolean, default: false },
      sem4: { type: Boolean, default: false },
    },
    ugAggregate: { type: Boolean, default: false },
    pgAggregate: { type: Boolean, default: false },
    pgugAggregate: {type: Boolean, default: false},
    domicileState: { type: Boolean, default: false },
    tenthResultPdf: { type: Boolean, default: false },
    twelfthResultPdf: { type: Boolean, default: false },
    ugAllSemResultPdf: { type: Boolean, default: false },
    pgAllSemResultPdf: { type: Boolean, default: false },
  },
}, {
  timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
});

const CompanyDescription = mongoose.model('CompanyDescription', companyDescriptionSchema);

module.exports = CompanyDescription;
