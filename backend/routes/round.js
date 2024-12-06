const express = require('express');
const router = express.Router();
const Company = require('../models/companyc');  // Import the Company model
const Student = require("../models/Student")
const {sendEmail}=require('../controllers/sendmails')
// Add round to a visit for a specific company and visit ID
router.post('/addround/:visitId', async (req, res) => {
    try {
        console.log("called")
        const { visitId } = req.params; // Extract visitId from the request
        const { name, date, venue, msg } = req.body; // Round details from request body

        // Find the company that contains the visit
        const company = await Company.findOne({ 'visits._id': visitId });

        if (!company) {
            return res.status(404).json({ message: 'Visit not found' });
        }

        // Find the specific visit in the company's visits array
        const visit = company.visits.id(visitId);

        // If there are no rounds in the visit, fetch students from the visit
        let studentsForRound = [];
        if (visit.rounds.length === 0) {
            // If no rounds, fetch students from the visitSchema
            studentsForRound = visit.appliedStudents;
        } else {
            // Otherwise, fetch students from the previous round's cleared students
            const previousRound = visit.rounds[visit.rounds.length - 1]; // Get the last round
            studentsForRound = previousRound.studentsCleared;
            console.log(studentsForRound+"gggg")
        }

        // Create the new round object
        const newRound = {
            name,
            date,
            venue,
            msg,
            studentsApplied: studentsForRound // Apply students for this round
        };

        // Add the round to the rounds array of the visit
        visit.rounds.push(newRound);

        // Save the updated company document
        await company.save();

        res.status(201).json({ message: 'Round added successfully', visit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding round', error: err.message });
    }
});
router.post('/announce/:visitId/:roundId', async (req, res) => {
    console.log("called")
    const { visitId, roundId } = req.params;
    const { studentsCleared } = req.body; // Array of student IDs sent from the frontend

    try {
        console.log("Announce API called: " + studentsCleared);

        // Find the company with the specified visit ID
        const company = await Company.findOne({ 'visits._id': visitId });
        if (!company) {
            return res.status(404).json({ message: 'Visit not found' });
        }

        // Find the specific visit in the company's visits array
        const visit = company.visits.id(visitId);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }

        // Find the specific round within the visit
        const round = visit.rounds.id(roundId);
        if (!round) {
            return res.status(404).json({ message: 'Round not found' });
        }

        // Update the studentsCleared field and set resultAnnounce to true
        round.resultAnnounce = true;
        round.studentsCleared = studentsCleared;

        // Save the updated company document
        await company.save();

        // Fetch all students who applied to this round
        const allAppliedStudents = await Student.find({ _id: { $in: round.studentsApplied } });

        // Separate cleared and rejected students
        const clearedStudents = allAppliedStudents.filter(student => studentsCleared.includes(student._id.toString()));
        const rejectedStudents = allAppliedStudents.filter(student => !studentsCleared.includes(student._id.toString()));

        // Send emails to cleared students
        for (const student of clearedStudents) {
            const to = student.email;
            const subject = `Congratulations! You've cleared Round ${roundId}`;
            const message = `
                Dear ${student.fname},

                Congratulations on clearing Round ${roundId} for the ${visit.name} visit by ${company.name}!

                Please stay tuned for further updates.

                Best regards,
                Placement Team
            `;

            try {
                await sendEmail(to, null, subject, message);
                console.log(`Email sent to ${student.fname} (${to})`);
            } catch (emailErr) {
                console.error(`Error sending email to ${student.fname} (${to}):`, emailErr.message);
            }
        }

        // Send rejection emails to students not cleared
        for (const student of rejectedStudents) {
            const to = student.email;
            const subject = `Update on Round ${roundId}`;
            const message = `
                Dear ${student.fname},

                We regret to inform you that you were not selected for the next round of the ${visit.name} visit by ${company.name}.

                We encourage you to continue your efforts and wish you the best for future opportunities.

                Best regards,
                Placement Team
            `;

            try {
                await sendEmail(to, null, subject, message);
                console.log(`Rejection email sent to ${student.fname} (${to})`);
            } catch (emailErr) {
                console.error(`Error sending rejection email to ${student.fname} (${to}):`, emailErr.message);
            }
        }

        res.status(200).json({
            message: 'Students cleared updated successfully, emails sent to cleared and rejected students.',
            round,
        });
    } catch (err) {
        console.error("Error updating studentsCleared:", err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});


router.get('/addround/student/:id', async (req, res) => {
    const studentId = req.params.id;
  
    try {
      const student = await Student.findById(studentId);
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.status(200).json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
