const mongoose = require('mongoose');

// Define the OfferLetter schema
const offerLetterSchema = new mongoose.Schema({
    visitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit', // Reference to the Visit schema
        // required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student schema
        // required: true
    },
    document: {
        type: String, // Path or URL to the uploaded offer letter document
        // required: true
    },
    issuedDate: {
        type: Date,
        default: Date.now // Automatically set to the current date
    }
});

// Create the OfferLetter model from the schema
const OfferLetter = mongoose.model('OfferLetter', offerLetterSchema);

// Export the OfferLetter model
module.exports = OfferLetter;
