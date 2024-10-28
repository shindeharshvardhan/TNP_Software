// coordinator.js (Mongoose Model)
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// coordinator.js (Mongoose Model)
// const mongoose = require('mongoose');

const coordinatorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Unique email for each coordinator
    name: { type: String, required: true }, // Unique email for each coordinator
    password: { type: String, required: true }, // Hashed password
    department: { type: String, required: true }, // Fixed the typo here
    year: { type: Number, required: true }, // Year of the coordinator
});





module.exports = mongoose.model('Coordinator', coordinatorSchema);
