const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

// JWT secret for generating tokens
const JWT_SECRET = 'abcd2020';

// Route 1: Check email in pre-existing coordinator collection
router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    try {
        // Connect to the database and find the email in 'coordinator' collection
        await client.connect();
        const database = client.db('TNP'); // Replace with your database name
        const coordinatorCollection = database.collection('coordinator');
        
        const coordinator = await coordinatorCollection.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ msg: 'Email not found in the coordinator database' });
        }

        return res.json({ msg: 'Email found, proceed to set password' });
    } catch (error) {
        res.status(500).send('Server error');
    } finally {
        await client.close();
    }
});

// Route 2: Set password for the coordinator
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    console.log('Received data:', req.body);  // Check what is being received

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    try {
        await client.connect();
        const database = client.db('TNP');
        const coordinatorCollection = database.collection('coordinator');

        const coordinator = await coordinatorCollection.findOne({ email });

        if (!coordinator) {
            return res.status(400).json({ msg: 'Email not found' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the coordinator's password in the collection
        await coordinatorCollection.updateOne(
            { _id: coordinator._id }, // Use the unique ID to update the document
            { $set: { password: hashedPassword } }
        );

        res.json({ msg: 'Password set, proceed to login' });
    } catch (error) {
        res.status(500).send('Server error');
    } finally {
        await client.close();
    }
});


// Route 3: Login for coordinator
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db('TNP');
        const coordinatorCollection = database.collection('coordinator');

        const coordinator = await coordinatorCollection.findOne({ email });

        if (!coordinator || !coordinator.password) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, coordinator.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Generate JWT token
        const payload = { userId: coordinator._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, msg: 'Login successful' });
    } catch (error) {
        res.status(500).send('Server error');
    } finally {
        await client.close();
    }
});

module.exports = router;
