const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define a sub-schema for storing semester data
const semesterSchema = new mongoose.Schema({
  year: { type: Date },
  percentage: { type: Number },
  attempts: { type: Number },
  marksheet: {
    data: String, // Store the file path
    contentType: String, // MIME type
  },
}, { _id: false });

// Define the main Student schema
const studentSchema = new mongoose.Schema({
  prn: { type: String, required: true, unique: true },
  photo: {
    data: String, // File path
    contentType: String, // MIME type (e.g., image/jpeg)
  },
  fname: { type: String, required: true },
  mname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  mob: { type: String, required: true },
  pmob: { type: String, required: true },
  nationality: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  maritalstatus: { type: String, required: true },
  bloodgroup: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  pstreet: { type: String, required: true },
  pcity: { type: String, required: true },
  pstate: { type: String, required: true },
  ppostalcode: { type: String, required: true },
  cstreet: { type: String },
  ccity: { type: String },
  cstate: { type: String },
  cpostalcode: { type: String },
  ssc: {
    passingYear: { type: Number, required: true },
    schoolName: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    marksObtained: { type: Number, required: true },
    percentage: { type: Number, required: true },
    boardName: { type: String, required: true },
    marksheet: {
      data: String, // Store file path
      contentType: String, // Store MIME type
    },
  },
  hscOrDiploma: { type: String, required: true }, // Either 'HSC' or 'Diploma'
  hsc: {
    passingYear: { type: Number },
    schoolName: { type: String },
    totalMarks: { type: Number },
    marksObtained: { type: Number },
    percentage: { type: Number },
    stream: { type: String },
    scienceTotalMarks: { type: Number },
    scienceMarksObtained: { type: Number },
    sciencePercentage: { type: Number },
    boardName: { type: String },
    marksheet: {
      data: String, // Store file path
      contentType: String, // Store MIME type
    },
  },
  diploma: {
    passingYear: { type: Number },
    collegeName: { type: String },
    specialization: { type: String },
    cgpa: { type: Number },
    percentage: { type: Number },
    marksheet: {
      data: String, // Store file path
      contentType: String, // Store MIME type
    },
  },
  ugData: {
    department: { type: String, required: true },
    collegeName: { type: String, required: true },
    atkt: { type: Number, required: true },
    semesters: [semesterSchema], // For storing Sem 1 to Sem 8
  },
  pgData: {
    department: { type: String },
    collegeName: { type: String },
    atkt: { type: Number },
    semesters: [semesterSchema], // For storing Sem 1 to Sem 4
  },
  password: { type: String, required: true },
  ugAggregate: { type: Number }, // New field to store UG aggregate
  pgAggregate: { type: Number } // New field to store PG aggregate
});

// Method to calculate the aggregate percentage for UG or PG data
studentSchema.methods.calculateAggregate = function (semesters) {
  const validSemesters = semesters.filter(sem => sem.percentage != null);
  const totalPercentage = validSemesters.reduce((acc, sem) => acc + sem.percentage, 0);
  return validSemesters.length > 0 ? totalPercentage / validSemesters.length : null;
};

// Pre-save hook to calculate aggregates before saving
studentSchema.pre("save", function (next) {
  const student = this;

  // Calculate UG aggregate
  if (student.ugData && student.ugData.semesters) {
    student.ugAggregate = student.calculateAggregate(student.ugData.semesters);
  }

  // Calculate PG aggregate
  if (student.pgData && student.pgData.semesters) {
    student.pgAggregate = student.calculateAggregate(student.pgData.semesters);
  }

  // Hash password if modified
  if (!student.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(student.password, salt, (err, hash) => {
      if (err) return next(err);
      student.password = hash;
      next();
    });
  });
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
