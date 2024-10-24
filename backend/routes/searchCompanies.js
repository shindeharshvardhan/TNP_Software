// const express = require('express');
// const router = express.Router();
// const Company = require('../models/companyc');

// // Search companies by name, department, or HR contact
// router.get('/search', async (req, res) => {
//     try {
//         const searchQuery = req.query.q;
//         const regex = new RegExp(searchQuery, 'i'); // 'i' makes it case-insensitive

//         // Find companies matching the query
//         const companies = await Company.find({
//             $or: [
//                 { name: regex },
//                 { department: regex },
//                 { 'visits.hrContactName': regex },
//                 { 'visits.job_loc': regex }
//             ]
//         }); // Return entire company object including visits

//         res.status(200).json(companies); // Send full company object including visits
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching companies', error: err });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Company = require('../models/companyc');

// Search companies by name, department, or HR contact
router.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const regex = new RegExp(searchQuery, 'i'); // 'i' makes it case-insensitive

        // Find companies matching the query
        const companies = await Company.find({
            $or: [
                { name: regex },
                { department: regex },
                { 'visits.hrContactName': regex },
                { 'visits.job_loc': regex }
            ]
        }); // Return only name and department for suggestions

        res.status(200).json(companies); // Send company name and department
    } catch (err) {
        res.status(500).json({ message: 'Error fetching companies', error: err });
    }
});

module.exports = router;
