const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require("../models/Student");
const Company = require("../models/companyc");

router.get('/student-progress', async (req, res) => {
    const prn = req.cookies.studentPrn; // Retrieve the student's PRN from the cookie
    if (!prn) {
        return res.status(400).json({ error: 'PRN is missing from cookies.' });
    }

    try {
        // Find the student by PRN and populate their accepted companies
        const student = await Student.findOne({ prn }).populate('companiesAccepted');
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // For each company the student has accepted, fetch the rounds and determine cleared stages
        const companiesProgress = await Promise.all(student.companiesAccepted.map(async (company) => {
            const companyProgress = {
                companyName: company.name,
                stages: [], // This will store the stages for each round
            };

            // Check if student has accepted the company
            const isAccepted = student.companiesAccepted.some(companyInList => companyInList._id.toString() === company._id.toString());

            // Add "Applied" stage and mark as green if the student has accepted the company
            if (isAccepted) {
                companyProgress.stages.push({
                    roundName: 'Applied', // Display the "Applied" stage
                    cleared: true, // Mark the "Applied" stage as green if student has accepted the company
                });
            }

            // Iterate over each round in the company
            company.visits.forEach(visit => {
                visit.rounds.forEach((round, roundIndex) => {
                    const isCleared = round.studentsCleared.some(studentId => studentId.toString() === student._id.toString());

                    // Add the stage to the stages array with 'green' if the student cleared the round
                    companyProgress.stages.push({
                        roundName: round.name,
                        cleared: isCleared,
                    });
                });
            });

            return companyProgress;
        }));

        res.json(companiesProgress); // Return the student's companies and their stages
    } catch (err) {
        console.error('Error fetching student progress:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/notifications', async (req, res) => {
    const prn = req.cookies.studentPrn; // Retrieve the student's PRN from the cookies

    if (!prn) {
        return res.status(400).json({ error: 'PRN is missing from cookies.' });
    }

    try {
        // Fetch the student document using the PRN
        const student = await Student.findOne({ prn }).populate('companiesAccepted');

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        const notifications = [];
        for (const company of student.companiesAccepted) {
            for (const visit of company.visits) {
                for (const round of visit.rounds) {
                    // Add notification only if `studentsCleared` array is empty
                    if (!round.studentsCleared || round.studentsCleared.length === 0) {
                        notifications.push({
                            companyName: company.name,
                            roundName: round.name,
                            date: round.date,
                            venue: round.venue,
                        });
                    }
                }
            }
        }

        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
  
module.exports = router;
