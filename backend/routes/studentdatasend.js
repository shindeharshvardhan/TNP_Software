const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { sendEmail } = require('../controllers/sendmails');

// API to filter students based on department and eligibility
router.post('/send-message', async (req, res) => {
    console.log("called")
    const { eligibleDepartments, tenthEligibility, twelfthEligibility } = req.body;

    try {
        // Step 1: Filter students based on eligibility criteria
        
        const students = await Student.find({
            'ugData.department': { $in: eligibleDepartments },
            'ssc.percentage': { $gte: tenthEligibility },
            'hsc.percentage': { $gte: twelfthEligibility }
        });
        console.log(students)
        // Step 2: Group students by their departments
        const departmentWiseStudents = eligibleDepartments.reduce((acc, dept) => {
            acc[dept] = students.filter(student => student.ugData.department === dept);
            return acc;
        }, {});

        // Step 3: Send email to each eligible student
        for (const dept in departmentWiseStudents) {
            const deptStudents = departmentWiseStudents[dept];
            deptStudents.forEach(student => {
                const email = student.email;
                const subject = 'Message from Company';
                const message = `Dear ${student.fname},\n\nYou are eligible for the opportunity based on your qualifications.\n\nBest Regards,\nCompany Name`;
                // console.log("HIII"+subject+message)
                sendEmail(email, 'kk',subject, message);
            });
        }

        return res.status(200).json({
            message: 'Emails sent to eligible students',
            data: departmentWiseStudents
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error occurred while processing the request' });
    }
});

module.exports = router;
