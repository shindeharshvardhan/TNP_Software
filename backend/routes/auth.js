const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const passport = require('../config/passportConfig'); // Import your passport configuration
const router = express.Router();

// Initialize MongoDB client and connect globally


// Route 1: Check email in pre-existing coordinator collection
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Please provide an email' });
    }

    try {
        const database = await connectDB();
        const coordinatorCollection = database.collection('coordinators');
        const coordinator = await coordinatorCollection.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ msg: 'Email not found in the coordinator list' });
        }

        if (coordinator.password) {
            return res.status(400).json({ msg: 'User already registered. Please login.' });
        }

        return res.status(200).json({ msg: 'Email is valid. Proceed to set password.', email });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

// Route 2: Set password for the coordinator
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    try {
        const database = await connectDB();
        const coordinatorCollection = database.collection('coordinators');

        const coordinator = await coordinatorCollection.findOne({ email });

        if (coordinator && coordinator.password) {
            return res.status(400).json({ msg: 'User already exists. Please login.' });
        }

        if (coordinator) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await coordinatorCollection.updateOne(
                { _id: coordinator._id },
                { $set: { password: hashedPassword } }
            );

            return res.json({ msg: 'Password set, proceed to login' });
        }

        return res.status(400).json({ msg: 'Email not found. Please contact the admin.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

// Route 3: Login using passport.js
router.post('/login', passport.authenticate('coordinator-login'), (req, res) => {
    res.json({ msg: 'Login successful', user: req.user });
});

// Route 4: Logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error logging out' });
        }
        res.json({ msg: 'Logged out successfully' });
    });
});

module.exports = router;
