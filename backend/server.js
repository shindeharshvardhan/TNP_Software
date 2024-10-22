const express = require("express");
const cors = require("cors");
require('dotenv').config(); 
const authRoutes = require('./routes/auth');
const path = require("path");
const student_registration_Routes = require("./routes/student_registration_Routes");
const student_login_Routes = require("./routes/student_login_Routes");

const app = express(); // Initialize the Express app

// Connect to the database
const db = require("./config/dbConfig"); // Ensure this connects correctly to your database

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing for frontend-backend communication
app.use(express.json()); // To parse incoming JSON requests

// Basic Route to verify the server is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes

app.use("/api/students",student_registration_Routes);
app.use("/api/students",student_login_Routes);

const eventRoutes = require("./routes/eventRoutes"); // Import your event routes
app.use("/api/events", eventRoutes); // Use event routes for /api/events endpoint

app.use('/api/auth', authRoutes);

// Define the port using environment variables or a default value
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
