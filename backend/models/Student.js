const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  tnpId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  mob: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  p_mob: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married'],
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  pre_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true, match: [/^\d{6}$/, 'Please enter a valid 6-digit postal code'] },
  },
  per_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true, match: [/^\d{6}$/, 'Please enter a valid 6-digit postal code'] },
  },
  ssc: {
    passingYear: { type: Number, required: true },
    schoolName: { type: String, required: true },
    marksObtained: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    boardName: { type: String, required: true },
  },
  hscOrDiploma: {
    type: String, // Either 'HSC' or 'Diploma'
    required: true,
  },
  hscOrDiplomaDetails: {
    passingYear: { type: Number },
    schoolOrCollegeName: { type: String },
    marksObtained: { type: Number },
    totalMarks: { type: Number },
    percentage: { type: Number },
    scienceMarksObtained: { type: Number },
    scienceTotalMarks: { type: Number },
    sciencePercentage: { type: Number },
    streamOrDiplomaSpecialization: { type: String },
    diplomaCgpa: { type: Number },
    diplomaPercentage: { type: Number },
  },
  higherEducation: {
    type: String,
    enum: ['BE', 'BARCH', 'MSC', 'MCA', 'ME', 'MURP'], // Accepts only these values
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  isPlaced: {
    type: String,
    default: null, // Holds company ID if placed, else null
  },
  // Optional reference to BachelorsData
  bachelorsData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BachelorsData',
    required: function() {
      // If higherEducation is one of the higher education types, bachelorsData is required
      return ['MCA', 'MSC', 'ME', 'MURP'].includes(this.higherEducation);
    }
  },
  // One-to-many relationship with Results
  results: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result',
  }],
});

// Define the Student Model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
