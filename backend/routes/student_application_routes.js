const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Student = require("../models/Student");
const Company = require("../models/companyc");
const { ObjectId } = mongoose.Types;

// Route to handle "accept company"
router.post('/accept-company', async (req, res) => {
    try {
        const { studentPrn, companyId } = req.body;

        const student = await Student.findOne({ prn: studentPrn }).populate("companiesAccepted");
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        student.companiesAccepted = student.companiesAccepted || []; // Initialize if undefined

        if (student.companiesAccepted.includes(companyId)) {
            return res.status(400).json({ error: "Company already accepted" });
        }

        student.companiesAccepted.push(companyId);
        await student.save();

        res.status(200).json({ message: "Company accepted successfully" });
    } catch (error) {
        console.error("Error in accept-company route:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// Route to handle "reject company"
router.post('/reject-company', async (req, res) => {
    const { studentPrn, companyId } = req.body;

    console.log("Request received to reject company");
    console.log("Student PRN:", studentPrn);
    console.log("Company ID:", companyId);

    if(!ObjectId.isValid(companyId)) {
        console.error("Invalid company ID");
        return res.status(400).json({ message: "Invalid company ID" });
    }

    try {
        // Find the student by PRN
        const student = await Student.findOne({ prn: studentPrn });
        if (!student) {
            console.error("Student not found");
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log("Found student:", student);

        if (student.companiesRejected.includes(companyId)) {
            console.log("Student has already rejected this company");
            return res.status(400).json({ error: 'Already rejected this company' });
        }
        
        // Find the company by ID
        const company = await Company.findById(companyId);
        if(!company) {
            console.error("Company not found");
            return res.status(404).json({ message: "Company not found" });
        }
        console.log("Found company:", company);

        // Check if the student has already rejected this company

        // Add the company ID to the companiesRejected array
        student.companiesRejected.push(companyId);
        await student.save();
        console.log("Student record updated:", student);

        return res.status(200).json({ message: 'Successfully rejected the company' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
