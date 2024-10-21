const express = require('express');
const router = express.Router();
const StudentCoordinator = require('../models/studentc');
const {sendEmail,generatePassword} =require('../controllers/sendmails')
// Get coordinators by year
router.get('/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const coordinators = await StudentCoordinator.find({ year: year });
        res.status(200).json(coordinators);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching coordinators' });
    }
});

// router.get('/', async (req, res) => {
//     const { department } = req.query;  // Get department from query parameter

//     try {
//         // If department is provided, filter by department, otherwise return all coordinators
//         const query = department ? { department } : {};  // Construct query conditionally
        
//         console.log('Query to be executed:', query);  // Log the query

//         const coordinators = await StudentCoordinator.find(query);  // Pass query object
//         res.status(200).json(coordinators);
//     } catch (error) {
//         console.error('Error fetching coordinators:', error);  // Log the error
//         res.status(500).json({ error: 'Error fetching coordinators' });
//     }
// });

const bcrypt = require('bcryptjs');

// Save new coordinators with hashed passwords
router.post('/', async (req, res) => {
    const { email, department, year,name } = req.body;

    try {
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash the generated password

        const coordinator = new StudentCoordinator({
            email: email,
            password: hashedPassword,  // Store hashed password in the database
            department: department,
            year: year,
            name:name
        });

        // Save the new coordinator to the database
        await coordinator.save();

        // Send email with credentials (sending raw password, not hashed, in the email)
        sendEmail(email, password);

        // Return success response
        res.status(201).json({ message: `Coordinator for year ${year} added successfully!` });
    } catch (error) {
        console.error('Error adding coordinator:', error);
        res.status(500).json({ error: 'Error adding coordinator' });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        // Check if a coordinator exists with the provided email
        const coordinator = await StudentCoordinator.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ message: 'Coordinator not found' });
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, coordinator.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If successful, you can return a success message or token for session management
        return res.status(200).json({ message: 'Login successful', coordinator });
        
        // Optionally, generate a session token or JWT to maintain user authentication
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/:email', async (req, res) => {
    const { email } = req.params; // Get the email from the request parameters
console.log(email)
    try {
        // Find and delete the coordinator by email
        const result = await StudentCoordinator.findOneAndDelete({ email });

        if (!result) {
            return res.status(404).json({ error: 'Coordinator not found' });
        }

        // Return a success response
        res.status(200).json({ message: 'Coordinator removed successfully!' });
    } catch (error) {
        console.error('Error removing coordinator:', error);
        res.status(500).json({ error: 'Error removing coordinator' });
    }
});
router.get('/', async (req, res) => {
    const { department, year } = req.query;  // Get department and year from query parameters
    console.log("hiii");

    try {
        // Check if at least one parameter is provided
        if (!department && !year) {
            return res.status(400).json({ message: 'At least one of department or year is required.' });
        }

        // Construct query object based on provided parameters
        const query = {};
        if (department) {
            query.department = department;  // Add department to the query if provided
        }
        if (year) {
            query.year = year;  // Add year to the query if provided
        }

        console.log('Query to be executed:', query);  // Log the query for debugging

        // Fetch coordinators based on the constructed query
        const coordinators = await StudentCoordinator.find(query);

        if (coordinators.length === 0) {
            return res.status(404).json({ message: 'No coordinators found for the given criteria.' });
        }

        // Return the list of coordinators
        res.status(200).json(coordinators);
    } catch (error) {
        console.error('Error fetching coordinators:', error);
        res.status(500).json({ error: 'Error fetching coordinators' });
    }
});



module.exports = router;
