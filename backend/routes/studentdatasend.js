const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Company = require('../models/companyc');
const { sendEmail } = require('../controllers/sendmails');

router.post('/send-message', async (req, res) => {
    console.log("API called");
    const { eligibleDepartments, tenthEligibility, twelfthEligibility, companyId, visitYear } = req.body;

    try {
        // Step 1: Filter students based on eligibility criteria
        const students = await Student.find({
            'ugData.department': { $in: eligibleDepartments },
            'ssc.percentage': { $gte: tenthEligibility },
            'hsc.percentage': { $gte: twelfthEligibility }
        });

        console.log("Eligible students found:", students);

        // Step 2: Group students by their departments
        const departmentWiseStudents = eligibleDepartments.reduce((acc, dept) => {
            acc[dept] = students.filter(student => student.ugData.department === dept);
            return acc;
        }, {});

        // Step 3: Add eligible students to the `eligibleStudents` field in the visit schema
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const visit = company.visits.find(v => v.year === visitYear);
        if (!visit) {
            return res.status(404).json({ message: 'Visit for the given year not found' });
        }

        const eligibleStudentIds = students.map(student => student._id);
        visit.eligibleStudents.push(...eligibleStudentIds);

        // Save the updated company document
        await company.save();

        // Step 4: Send email to each eligible student
        for (const dept in departmentWiseStudents) {
            const deptStudents = departmentWiseStudents[dept];
            deptStudents.forEach(student => {
                const email = student.email;
                const subject = 'Message from Company';
                const message = `Dear ${student.fname},\n\nYou are eligible for the opportunity based on your qualifications.\n\nBest Regards,\nCompany Name`;
                sendEmail(email, 'kk', subject, message);
            });
        }

        return res.status(200).json({
            message: 'Emails sent to eligible students and IDs added to visit record',
            data: departmentWiseStudents
        });
    } catch (error) {
        console.error("Error in /send-message:", error);
        return res.status(500).json({ message: 'Error occurred while processing the request' });
    }
});

module.exports = router;
