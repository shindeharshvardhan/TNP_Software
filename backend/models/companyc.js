// const mongoose = require('mongoose');

// // Define the schema for visits
// const visitSchema = new mongoose.Schema({
//     year: { type: Number, required: true }, // Year of the assignment
//     hrContactName: { type: String }, // HR contact for the visit
//     hrContactEmail: { type: String }, // HR contact's email
//     coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator' }, // Reference to Coordinator
//     // country: { type: String, required: true }, // Country to reflect coordinators from different regions
//     completed :{type:Boolean, default:false}
// });

// // Define the Company schema
// const companySchema = new mongoose.Schema({
//     name: { type: String, required: true }, // Company name
//     department: { type: String, required: true }, // Department (e.g., CSE, Mechanical)
//     // visits: [visitSchema] // Array of visits, each representing a coordinator assigned in a specific year
// });

// // Create the Company model from the schema
// const Company = mongoose.model('Company', companySchema);

// // Export the Company model
// module.exports = Company;


const mongoose = require('mongoose');

// Define the schema for visits
const visitSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    hrContactName: { type: String },
    hrContactEmail: { type: String },
    job_loc: [{ type: String }]
    // coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator' } // Reference to Coordinator
});

// Define the Company schema
const companySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Company name
    department: { type: String, required: true }, // Department (e.g., CSE, Mechanical)
    visits: [visitSchema] // Array of visits
});

// Create the Company model from the schema
const Company = mongoose.model('Company', companySchema);

// Export the Company model
module.exports = Company;