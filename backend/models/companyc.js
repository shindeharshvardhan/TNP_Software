const mongoose = require('mongoose');

// Define the schema for visits
const visitSchema = new mongoose.Schema({
    year: { type: Number, required: true }, // Year of the assignment
    hrContactName: { type: String }, // HR contact for the visit
    hrContactEmail: { type: String }, // HR contact's email
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator' }, // Reference to Coordinator
    // country: { type: String, required: true }, // Country to reflect coordinators from different regions
    completed :{type:Boolean, default:false},
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
    jobRole:{type:String},
    location: { type: String }, // Location of the job/internship (optional)
    isInternshipOffered: { type: Boolean, default: false }, // Indicates if an internship is offered (optional)
    internshipDuration: { type: Number }, // Number of months for the internship (optional)
    internshipStipend: { type: Number }, // Stipend amount for the internship (optional)
    extraDetails: { type: String },
    tenthEligibility: { type: String }, // 10th eligibility percentage (optional)
    twelfthEligibility: { type: String }, // 12th eligibility percentage (optional)
    beAggregate: { type: String },
    eligibleStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference to the Student schema
    }] 
});
// jobRole,
//       ctc,
//       location,
//       isInternshipOffered,
//       internshipMonths,
//       internshipStipend,
//       extraDetails,
//       tenthEligibility,
//       twelfthEligibility,
//       beAggregate,

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
