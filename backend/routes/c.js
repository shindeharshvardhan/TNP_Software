const express = require('express');
const router = express.Router();
const Company = require('../models/companyc'); // Ensure the path is correct
const StudentCoordinator = require('../models/studentc'); // Assuming coordinator info is stored here

// Fetch companies based on department (faculty) with coordinator information
router.get('/companies', async (req, res) => {
    const { department, year } = req.query; // Get department and year from query parameters
    console.log('Query parameters:', { department, year }); // Log both parameters

    try {
        // Create a query object to filter by department and year if provided
        const query = {};
        if (department) {
            query.department = department;
        }
        if (year) {
            query.visits = { $elemMatch: { year: parseInt(year) } }; // Match visit records for the specified year
        }

        console.log('Query Object:', query); // Log the query object for debugging

        // Fetch companies based on the query, populating the coordinator info
        const companies = await Company.find(query)
            .populate('visits.coordinator', 'name email') // Populate coordinator name and email within visits
            .lean(); // Use lean to get plain JavaScript objects

        // If no companies are found for the specified filters
        if (companies.length === 0) {
            return res.status(404).json({ message: 'No companies found for the specified filters' });
        }

        // Return company name, faculty (department), and visit details including coordinator name
        const companyList = companies.map(company => ({
            name: company.name,
            faculty: company.department,
            visits: company.visits.map(visit => ({
                year: visit.year,
                hrContactName: visit.hrContactName,
                hrContactEmail: visit.hrContactEmail,
                coordinatedBy: visit.coordinator ? visit.coordinator.name : 'Not Assigned',
                coordinatorEmail: visit.coordinator ? visit.coordinator.email : 'Not Assigned'
            }))
        }));

        // Send the filtered company list
        res.status(200).json(companyList);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: error.message || 'Error fetching companies' });
    }
});

// Fetch all companies for a specific department
router.get('/companies/dept/:department', async (req, res) => {
    const { department } = req.params; // Get department from URL parameters
    console.log('Department parameter:', department); // Log the department parameter for debugging
    console.log("hiii")
    try {
        // Fetch companies for the specified department, populating the coordinator info within visits
        const companies = await Company.find({ department })
            .populate('visits.coordinator', 'name email') // Populate coordinator name and email within visits
            .lean(); // Use lean to get plain JavaScript objects

        // If no companies are found for the specified department
        if (companies.length === 0) {
            return res.status(200).json({ message: `No companies found for the ${department} department` });
        }

        // Return company _id, name, faculty (department), and visit details including coordinator information
        const companyList = companies.map(company => ({
            id: company._id.toString(), // Convert ObjectId to string
            name: company.name,
            faculty: company.department,
            visits: company.visits.map(visit => ({
                year: visit.year,
                hrContactName: visit.hrContactName,
                hrContactEmail: visit.hrContactEmail,
                coordinatedBy: visit.coordinator ? visit.coordinator.name : 'Not Assigned',
                coordinatorEmail: visit.coordinator ? visit.coordinator.email : 'Not Assigned'
            }))
        }));

        // Send the company list for the specified department
        res.status(200).json(companyList);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: error.message || 'Error fetching companies' });
    }
});


// Endpoint to add a new visit for a specific company
router.post('/companies/:companyId/visits', async (req, res) => {
    const { companyId } = req.params; // Get company ID from URL parameters
    const { year, hrContactName, hrContactEmail, coordinatorId } = req.body; // Get visit details from the request body

    try {
        // Find the company by ID
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check if a visit for the specified year already exists
        const existingVisit = company.visits.find(visit => visit.year === parseInt(year));

        if (existingVisit) {
            return res.status(400).json({ message: 'A visit for this year already exists' });
        }

        // Create a new visit object
        const newVisit = {
            year: parseInt(year),
            hrContactName,
            hrContactEmail,
            coordinator: coordinatorId || null // If coordinatorId is provided, assign it
        };

        // Add the new visit to the company's visits array
        company.visits.push(newVisit);

        // Save the updated company document
        await company.save();

        res.status(201).json({ message: 'New visit added successfully', company });
    } catch (error) {
        console.error('Error adding new visit:', error);
        res.status(500).json({ error: 'Error adding new visit' });
    }
});
router.post('/companies', async (req, res) => {
    const { name, faculty } = req.body; // Extract name and faculty from the request body
    console.log("hii")
    try {
        // Check if a company with the same name and department already exists
        const existingCompany = await Company.findOne({ name, department: faculty });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company with the same name and department already exists' });
        }

        // Create a new company instance
        const newCompany = new Company({
            name,
            department: faculty, // Assuming "faculty" maps to the "department" field in your schema
            visits: [] // Initialize an empty visits array
        });

        // Save the new company to the database
        const savedCompany = await newCompany.save();

        // Respond with the newly created company details
        res.status(201).json(savedCompany);
    } catch (error) {
        console.error('Error adding company:', error);
        res.status(500).json({ error: 'Error adding company' });
    }
});
module.exports = router;
