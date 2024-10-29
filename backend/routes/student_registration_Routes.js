const express = require('express');
const multer = require('multer');
const Student = require('../models/Student'); // Import the Student model

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use timestamp for uniqueness
  },
});

const upload = multer({ storage });

// Route to handle student registration with file upload
router.post('/register', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'ssc_marksheet', maxCount: 1 },
  { name: 'hsc_marksheet', maxCount: 1 },
  { name: 'diploma_marksheet', maxCount: 1 },
  // Include marksheets for UG semesters
  { name: 'ug_sem1_marksheet', maxCount: 1 },
  { name: 'ug_sem2_marksheet', maxCount: 1 },
  { name: 'ug_sem3_marksheet', maxCount: 1 },
  { name: 'ug_sem4_marksheet', maxCount: 1 },
  { name: 'ug_sem5_marksheet', maxCount: 1 },
  { name: 'ug_sem6_marksheet', maxCount: 1 },
  { name: 'ug_sem7_marksheet', maxCount: 1 },
  { name: 'ug_sem8_marksheet', maxCount: 1 },
  // Include marksheets for PG semesters
  { name: 'pg_sem1_marksheet', maxCount: 1 },
  { name: 'pg_sem2_marksheet', maxCount: 1 },
  { name: 'pg_sem3_marksheet', maxCount: 1 },
  { name: 'pg_sem4_marksheet', maxCount: 1 },
]), async (req, res) => {
  try {
    // Debugging: Log the request body and files
    console.log('--- Register API Called ---');
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);

    const existingPRN = await Student.findOne({ prn: req.body.prn });
    if (existingPRN) {
      return res.status(400).json({ message: 'PRN already registered' });
    }

    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Validate required fields for UG or PG
    if (!req.body.prn || !req.body.fname || !req.body.lname) {
      console.log('Missing required fields: prn, fname, or lname');
      return res.status(400).json({ message: 'Missing required fields: prn, fname, or lname' });
    }

    // Debugging: Check password before hashing
    console.log('Password before hashing:', req.body.password);

    // Create a new student object
    const newStudent = new Student({
      prn: req.body.prn,
      photo: req.files['photo'] ? {
        data: req.files['photo'][0]?.path,
        contentType: req.files['photo'][0]?.mimetype,
      } : undefined,
      fname: req.body.fname,
      mname: req.body.mname,
      lname: req.body.lname,
      email: req.body.email,
      mob: req.body.mob,
      pmob: req.body.pmob,
      nationality: req.body.nationality,
      dob: req.body.dob,
      gender: req.body.gender,
      maritalstatus: req.body.maritalstatus,
      bloodgroup: req.body.bloodgroup,
      height: req.body.height,
      weight: req.body.weight,
      pstreet: req.body.pstreet,
      pcity: req.body.pcity,
      pstate: req.body.pstate,
      ppostalcode: req.body.ppostalcode,
      cstreet: req.body.cstreet,
      ccity: req.body.ccity,
      cstate: req.body.cstate,
      cpostalcode: req.body.cpostalcode,
      ssc: {
        passingYear: req.body.sscpassingyear,
        schoolName: req.body.sscschoolname,
        totalMarks: req.body.ssctotmarks,
        marksObtained: req.body.sscmarksobt,
        percentage: req.body.sscper,
        boardName: req.body.sscboardname,
        marksheet: req.files['ssc_marksheet'] ? {
          data: req.files['ssc_marksheet'][0]?.path,
          contentType: req.files['ssc_marksheet'][0]?.mimetype,
        } : undefined,
      },
      hscOrDiploma: req.body.hscOrDiploma,
      password: req.body.password, // Password will be hashed by the pre-save middleware
    });

    if (req.body.hscOrDiploma === 'HSC') {
      newStudent.hsc = {
        passingYear: req.body.hscpassingyear,
        schoolName: req.body.hscschoolname,
        totalMarks: req.body.hsctotmarks,
        marksObtained: req.body.hscmarksobt,
        percentage: req.body.hscper,
        stream: req.body.hscstream,
        scienceTotalMarks: req.body.hscscitotmarks,
        scienceMarksObtained: req.body.hscscimarksobt,
        sciencePercentage: req.body.hscsciper,
        boardName: req.body.hscboardname,
        marksheet: req.files['hsc_marksheet'] ? {
          data: req.files['hsc_marksheet'][0]?.path,
          contentType: req.files['hsc_marksheet'][0]?.mimetype,
        } : undefined,
      };
    }

    // Handle Diploma Data if applicable
    if (req.body.hscOrDiploma === 'Diploma') {
      newStudent.diploma = {
        passingYear: req.body.diplomapassingyear,
        collegeName: req.body.diplomaclgname,
        specialization: req.body.diplomaspec,
        cgpa: req.body.diplomacgpa,
        percentage: req.body.diplomaper,
        marksheet: req.files['diploma_marksheet'] ? {
          data: req.files['diploma_marksheet'][0]?.path,
          contentType: req.files['diploma_marksheet'][0]?.mimetype,
        } : undefined,
      };
    }

    // Handle UG Data if applicable
    if (req.body.ugOrPg === 'UG' || req.body.ugOrPg === 'PG') {
      if (!req.body.ugDepartment || !req.body.ugCollegeName || req.body.ugATKT === undefined) {
        console.log('Missing required fields for UG data');
        return res.status(400).json({ message: 'Missing required fields for UG data' });
      }

      newStudent.ugData = {
        department: req.body.ugDepartment,
        collegeName: req.body.ugCollegeName,
        atkt: req.body.ugATKT,
        semesters: [
          { year: req.body.ug_sem1_year, percentage: req.body.ug_sem1_percentage, attempts: req.body.ug_sem1_attempts, marksheet: req.files['ug_sem1_marksheet'] ? { data: req.files['ug_sem1_marksheet'][0]?.path, contentType: req.files['ug_sem1_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.ug_sem2_year, percentage: req.body.ug_sem2_percentage, attempts: req.body.ug_sem2_attempts, marksheet: req.files['ug_sem2_marksheet'] ? { data: req.files['ug_sem2_marksheet'][0]?.path, contentType: req.files['ug_sem2_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.ug_sem3_year, percentage: req.body.ug_sem3_percentage, attempts: req.body.ug_sem3_attempts, marksheet: req.files['ug_sem3_marksheet'] ? { data: req.files['ug_sem3_marksheet'][0]?.path, contentType: req.files['ug_sem3_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.ug_sem4_year, percentage: req.body.ug_sem4_percentage, attempts: req.body.ug_sem4_attempts, marksheet: req.files['ug_sem4_marksheet'] ? { data: req.files['ug_sem4_marksheet'][0]?.path, contentType: req.files['ug_sem4_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.ug_sem5_year, percentage: req.body.ug_sem5_percentage, attempts: req.body.ug_sem5_attempts, marksheet: req.files['ug_sem5_marksheet'] ? { data: req.files['ug_sem5_marksheet'][0]?.path, contentType: req.files['ug_sem5_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.ug_sem6_year, percentage: req.body.ug_sem6_percentage, attempts: req.body.ug_sem6_attempts, marksheet: req.files['ug_sem6_marksheet'] ? { data: req.files['ug_sem6_marksheet'][0]?.path, contentType: req.files['ug_sem6_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.ug_sem7_year, percentage: req.body.ug_sem7_percentage, attempts: req.body.ug_sem7_attempts, marksheet: req.files['ug_sem7_marksheet'] ? { data: req.files['ug_sem7_marksheet'][0]?.path, contentType: req.files['ug_sem7_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.ug_sem8_year, percentage: req.body.ug_sem8_percentage, attempts: req.body.ug_sem8_attempts, marksheet: req.files['ug_sem8_marksheet'] ? { data: req.files['ug_sem8_marksheet'][0]?.path, contentType: req.files['ug_sem8_marksheet'][0]?.mimetype } : undefined },
        ],
      };
    }

    if (req.body.ugOrPg === 'PG') {
      if (!req.body.pgDepartment || !req.body.pgCollegeName || req.body.pgATKT === undefined) {
        return res.status(400).json({ message: 'Missing required fields for PG data' });
      }

      newStudent.pgData = {
        department: req.body.pgDepartment,
        collegeName: req.body.pgCollegeName,
        atkt: req.body.pgATKT,
        semesters: [
          { year: req.body.pg_sem1_year, percentage: req.body.pg_sem1_percentage, attempts: req.body.pg_sem1_attempts, marksheet: req.files['pg_sem1_marksheet'] ? { data: req.files['pg_sem1_marksheet'][0]?.path, contentType: req.files['pg_sem1_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.pg_sem2_year, percentage: req.body.pg_sem2_percentage, attempts: req.body.pg_sem2_attempts, marksheet: req.files['pg_sem2_marksheet'] ? { data: req.files['pg_sem2_marksheet'][0]?.path, contentType: req.files['pg_sem2_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.pg_sem3_year, percentage: req.body.pg_sem3_percentage, attempts: req.body.pg_sem3_attempts, marksheet: req.files['pg_sem3_marksheet'] ? { data: req.files['pg_sem3_marksheet'][0]?.path, contentType: req.files['pg_sem3_marksheet'][0]?.mimetype } : undefined },
          { year: req.body.pg_sem4_year, percentage: req.body.pg_sem4_percentage, attempts: req.body.pg_sem4_attempts, marksheet: req.files['pg_sem4_marksheet'] ? { data: req.files['pg_sem4_marksheet'][0]?.path, contentType: req.files['pg_sem4_marksheet'][0]?.mimetype } : undefined },
        ],
      };
    }

    // Save the student data to the database
    await newStudent.save();

    // Debugging: Log success message after save
    console.log('New student registered successfully:', newStudent);

    // Send success response
    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
