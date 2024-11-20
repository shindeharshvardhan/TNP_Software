const express = require('express');
const router = express.Router();
const Student = require("../models/Student");
const Company = require("../models/companyc");

// Route to get eligible companies for a student
router.get('/eligible-companies/:prn', async (req, res) => {
    try {
      const { prn } = req.params;
      console.log(`Fetching student with PRN: ${prn}`)
  
      // Fetch student details by PRN
      const student = await Student.findOne({ prn }).populate("companiesAccepted").populate("companiesRejected");
      if (!student) {
        console.error(`student with PRN ${prn} not found`);
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Log the student to verify department and student ID
      console.log(`Student found: ${student}`);
  
      // Fetch companies where the student is eligible
      const companies = await Company.find({
        'visits.eligibleStudents': student._id,            // Match the student's ID
      });
  
      if (companies.length === 0) {
        console.log(`No eligible companies found for student with PRN: ${prn}`);
        return res.status(404).json({ error: 'No eligible companies found for this student.' });
      }

      const enrichedCompanies = companies.map(company => {
        const isAccepted = student.companiesAccepted.some(c => c._id.equals(company._id));
        const isRejected = student.companiesRejected.some(c => c._id.equals(company._id));

        return {
          ...company.toObject(),
          isAccepted,
          isRejected,
        };
      });
  
      res.json(enrichedCompanies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
