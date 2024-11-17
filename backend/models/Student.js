const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define a sub-schema for storing semesters data
const semesterSchema = new mongoose.Schema({
  year: { type: Date },
  percentage: { type: Number },
  attempts: { type: Number },
  marksheet: {
    data: String, // We'll store the file path as a string
    contentType: String, // For MIME type
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
  // department :{type : String ,required:true},
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
  password: { type: String, required: true }
});

studentSchema.pre("save", async function (next) {
  const student = this;
  if(!student.isModified("password")) return next();
  try{
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
    next();
  }
  catch(error){
    return next(error);
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
