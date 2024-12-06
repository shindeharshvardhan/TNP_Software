const mongoose = require('mongoose');

// Define the Round schema
const roundSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the round (e.g., Aptitude Test, HR Interview)
    date: { type: Date, required: true }, // Date of the round
    venue: { type: String, required: true }, // Venue of the round
    msg: { type: String }, // Message related to the round
    studentsApplied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference to the Student schema
    }], // Array of students who applied for this round
    studentsCleared: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference to the Student schema
    }], // Array of students who cleared this round
    msgSent: { type: Boolean, default: false }, // Whether the message was sent
    resultAnnounce: { type: Boolean, default: false } // Whether the result was announced
});

// Define the schema for visits
const visitSchema = new mongoose.Schema({
    year: { type: Number, required: true }, // Year of the assignment
    hrContactName: { type: String }, // HR contact for the visit
    hrContactEmail: { type: String }, // HR contact's email
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator' }, // Reference to Coordinator
    completed: { type: Boolean, default: false }, // Whether the visit is completed
    notify: { type: Boolean, default: false }, // Whether the visit is completed
    eligibleDepartments: { 
        type: [String], 
        enum: [
            "BSC Applied Physics",
            "B.Arch",
            "BE Chemical Engineering",
            "BE Civil Engineering",
            "BE Computer Science and Engineering",
            "BE Electrical Engineering",
            "BE Electronics Engineering",
            "BE Mechanical Engineering",
            "BE Metallurgical and Materials Engineering",
            "BE Textile Engineering",
            "Water Resources Engineering and Management (WREM)"
        ],
        default: undefined // Optional field
    },
    ctc: { type: Number }, // Cost to company (optional)
    jobRole: { type: String }, // Job role offered
    location: { type: String }, // Location of the job/internship (optional)
    isInternshipOffered: { type: Boolean, default: false }, // Indicates if an internship is offered (optional)
    internshipDuration: { type: Number }, // Number of months for the internship (optional)
    internshipStipend: { type: Number }, // Stipend amount for the internship (optional)
    extraDetails: { type: String }, // Extra details
    tenthEligibility: { type: String }, // 10th eligibility percentage (optional)
    twelfthEligibility: { type: String }, // 12th eligibility percentage (optional)
    beAggregate: { type: String }, // Aggregate percentage eligibility
    deadline: { type: Date }, // Aggregate percentage eligibility
    eligibleStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference to the Student schema
    }],
    appliedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference to the Student schema
    }],
    rounds: [roundSchema] // Array of rounds associated with the visit
});

// Define the Company schema
const companySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Company name
    department: { type: String, required: true }, // Department (e.g., CSE, Mechanical)
    visits: [visitSchema] // Array of visits, each representing a coordinator assigned in a specific year
});

// Create the Company model from the schema
const Company = mongoose.model('Company', companySchema);

// Export the Company model
module.exports = Company;