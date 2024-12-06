const express = require('express');
const router = express.Router();
const Student = require("../models/Student");
const Company = require("../models/companyc");

// Route to get eligible companies for a student
router.get('/eligible-companies/:prn', async (req, res) => {
    try {
        const { prn } = req.params;
        console.log(`Fetching eligible companies for student PRN: ${prn}`);

        // Fetch the student by PRN
        const student = await Student.findOne({ prn }).populate("companiesAccepted");
        if (!student) {
            console.error(`Student with PRN ${prn} not found`);
            return res.status(404).json({ error: 'Student not found' });
        }

        // Fetch companies where the student is eligible
        const companies = await Company.find({
            'visits.eligibleStudents': student._id, // Match the student's ID
        });

        if (companies.length === 0) {
            console.log(`No eligible companies found for student with PRN: ${prn}`);
            return res.status(404).json({ error: 'No eligible companies found for this student.' });
        }

        // Enrich the company data with acceptance status
        const enrichedCompanies = companies.map(company => {
            const isAccepted = student.companiesAccepted.some(c => c._id.equals(company._id));
            return {
                ...company.toObject(),
                isAccepted,
            };
        });

        res.status(200).json(enrichedCompanies);
    } catch (error) {
        console.error("Error fetching eligible companies:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;