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

        // Fetch the student object by PRN
        const student = await Student.findOne({ prn: studentPrn }).populate("companiesAccepted");
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Fetch the company object by companyId
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        // Check if the company is already accepted
        student.companiesAccepted = student.companiesAccepted || [];
        if (student.companiesAccepted.includes(companyId)) {
            return res.status(400).json({ error: "Company already accepted" });
        }

        // Add the company to the student's accepted list
        console.log(companyId+"here")
        student.companiesAccepted.push(companyId);
        await student.save();

        // Sort visits by date to get the latest visit
        const visit = company.visits[company.visits.length-1];
        if (!visit) {
            return res.status(404).json({ error: "No valid visit found for this company" });
        }

        // Add the student's ObjectId to the appliedStudents array of the relevant visit
        console.log("Student ID being added to the appliedStudents array:", student._id);
        visit.appliedStudents.push(student._id);
        
        await company.save();
        console.log("Company after applying student:", company); // Log after saving

        res.status(200).json({ message: "Company accepted successfully" });
    } catch (error) {
        console.error("Error in accept-company route:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// Route to get accepted companies (student responses)
router.get("/:studentPrn/responses", async (req, res) => {
    try {
        const { studentPrn } = req.params;

        const student = await Student.findOne({ prn: studentPrn }).populate("companiesAccepted");
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const acceptedCompanies = student.companiesAccepted.map(company => company._id);

        res.status(200).json({ acceptedCompanies });
    } catch (error) {
        console.error("Error fetching student responses:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;