const express = require('express');
const router = express.Router();
const FacultyCoordinator = require('../models/facultyc');
const {sendEmail,generatePassword} =require('../controllers/sendmails')
// Get coordinators by year
router.get('/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const coordinators = await FacultyCoordinator.find({ year: year });
        res.status(200).json(coordinators);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching coordinators' });
    }
});

router.get('/', async (req, res) => {
    const { department } = req.query;  // Get department from query parameter

    try {
        // If department is provided, filter by department, otherwise return all coordinators
        const query = department ? { department } : {};  // Construct query conditionally
        
        console.log('Query to be executed :', query);  // Log the query

        const coordinators = await FacultyCoordinator.find(query);  // Pass query object
        res.status(200).json(coordinators);
    } catch (error) {
        console.error('Error fetching coordinators:', error);  // Log the error
        res.status(500).json({ error: 'Error fetching coordinators' });
    }
});




const bcrypt = require('bcryptjs');

// Save new coordinators with hashed passwords
router.post('/', async (req, res) => {
    const { year, coordinators } = req.body;

    try {
        const newCoordinators = await Promise.all(coordinators.map(async (c) => {
            const password = generatePassword();
            const hashedPassword = await bcrypt.hash(password, 10);  // Hash the generated password

            const coordinator = new FacultyCoordinator({
                year,
                name: c.name,
                email: c.email,
                department: c.department,
                password: hashedPassword  // Store hashed password
            });

            // Send email with credentials
            sendEmail(c.email, password); // Send raw password via email (not hashed)

            return coordinator;
        }));

        await FacultyCoordinator.insertMany(newCoordinators);
        res.status(201).json({ message: `Coordinators for year ${year} added successfully!` });
    } catch (error) {
        console.error('Error adding coordinators:', error);
        res.status(500).json({ error: 'Error adding coordinators' });
    }
});

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body)

//     try {
//         // Check if a coordinator exists with the provided email
//         const coordinator = await FacultyCoordinator.findOne({ email });

//         if (!coordinator) {
//             return res.status(400).json({ message: 'Coordinator not found' });
//         }

//         // Compare the password with the stored hashed password
//         const isMatch = await bcrypt.compare(password, coordinator.password);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // If successful, you can return a success message or token for session management
//         return res.status(200).json({ message: 'Login successful', coordinator });
        
//         // Optionally, generate a session token or JWT to maintain user authentication
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        // Check if a coordinator exists with the provided email
        const coordinator = await FacultyCoordinator.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ message: 'Coordinator not found' });
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, coordinator.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return department information on successful login
        return res.status(200).json({
            message: 'Login successful',
            coordinator: {
                email: coordinator.email,
                department: coordinator.department, // Include department info
                year: coordinator.year,
            },
        });

        // Optionally, generate a session token or JWT to maintain user authentication
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
