const mongoose = require('mongoose');

// Define the CompanyDetail Schema
const companyDetailSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    unique: true,
  },
  ctc: {
    type: Number, // CTC (Cost to Company) in currency units
    required: true,
  },
  tenthEligibility: {
    type: Number, // Eligibility percentage for 10th grade
    required: true,
  },
  twelfthEligibility: {
    type: Number, // Eligibility percentage for 12th grade
    required: true,
  },
  note: {
    type: String, // Any additional notes
  },
  jobLocation: {
    type: String, // Location of the job
    required: true,
  },
  isBond: {
    type: Boolean, // Whether there is a bond
    required: true,
  },
  companyDoc: {
    type: String, // URL or path to company document
  },
  beSemEligibility: {
    type: Number, // Eligibility percentage for BE semester exams
  },
  beAggEligibility: {
    type: Number, // Eligibility percentage for BE aggregate
  },
  isD2DAllowed: {
    type: Boolean, // Whether direct-to-degree (D2D) candidates are allowed
    required: true,
  },
  yearsOfBond: {
    type: Number, // Duration of the bond in years
  },
  fineAmount: {
    type: Number, // Fine amount in currency units
  },
  internshipStipend: {
    type: Number, // Stipend amount for internship/training
  },
  internshipMonths: {
    type: Number, // Duration of the internship/training in months
  },
});

// Define the CompanyDetail Model
const CompanyDetail = mongoose.model('CompanyDetail', companyDetailSchema);

module.exports = CompanyDetail;
