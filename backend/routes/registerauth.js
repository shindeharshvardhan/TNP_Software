const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Coordinator = require('../models/studentc'); // Import Coordinator model
const router = express.Router();

// Route 1: Check email in pre-existing coordinator collection
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Please provide an email' });
    }

    try {
        const coordinator = await Coordinator.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ msg: 'Email not found in the coordinator list' });
        }

        if (coordinator.password) {
            return res.status(400).json({ msg: 'User already registered. Please login.' });
        }

        return res.status(200).json({ msg: 'Email is valid. Proceed to set password.', email });
    } catch (error) {
        console.error('Error in /check-email:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

// Route 2: Set password for the coordinator
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    try {
        const coordinator = await Coordinator.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ msg: 'Email not found. Please contact the admin.' });
        }

        if (coordinator.password) {
            return res.status(400).json({ msg: 'User already exists. Please login.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        coordinator.password = hashedPassword;
        await coordinator.save();

        return res.status(200).json({ msg: 'Password set, proceed to login.' });
    } catch (error) {
        console.error('Error in /register:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
