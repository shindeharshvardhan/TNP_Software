const express = require('express');
const mongoose = require('mongoose');
const Company = require('../models/companyc'); // Import the Company model
const OfferLetter = require('../models/OfferLetter'); // Import the OfferLetter model
const Student = require('../models/Student'); // Import the Student model

const router = express.Router();

// API to add an Offer Letter to an embedded visit in Company
router.post('/addOfferLetter', async (req, res) => {
    const { companyId, visitYear, studentId } = req.body;
    console.log(companyId,visitYear,studentId)

    try {
        // Validate if the Company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Find the visit for the given year
        const visit = company.visits.find(visit => visit.year === visitYear);
        if (!visit) {
            return res.status(404).json({ error: 'Visit not found for the specified year' });
        }
       visit.completed=true
        // Validate if the Student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Create a new OfferLetter
        const offerLetter = new OfferLetter({
            visitId: visit._id,  // Reference to the current visit
            studentId,
            document,
        });

        // Save the OfferLetter to the database
        await offerLetter.save();

        // Push the offer letter to the `offerLetters` array in the visit
        visit.offerLetters.push(offerLetter._id);
        
        // Save the updated company document
        await company.save();

        // Respond with success
        return res.status(201).json({
            message: 'Offer Letter added successfully',
            offerLetter,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
