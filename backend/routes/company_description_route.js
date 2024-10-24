const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const CompanyDescription = require("../models/CompanyDescription");

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true}));

router.use((req, res, next) => {
    console.log("Request received : ", req.method, req.path);
    console.log("Request body : ", req.body);
    next();
});

router.post("/", async(req, res) => {
    try{
        console.log("Inside POST /company-description");
        const {
            programs,
            selectedDepartments,
            eligibilityCriteria,
            jobDetails,
            internshipDetails,
            trainingDetails,
            otherDetails
        } = req.body;

        console.log('Programs: ', programs);
        console.log('Selected Departments: ', selectedDepartments);
        console.log('Eligibility Criteria: ', eligibilityCriteria);
        console.log('Job Details: ', jobDetails);
        console.log('Internship Details: ', internshipDetails);
        console.log('Training Details: ', trainingDetails);
        console.log('Other Details: ', otherDetails);

        const newCompanyDescription = new CompanyDescription({
            programs,
            selectedDepartments,
            eligibilityCriteria,
            jobDetails,
            internshipDetails,
            trainingDetails,
            otherDetails
        });
        
        await newCompanyDescription.save();

        res.status(200).json("Company description data saved successfully!");
        console.log("Data saved successfully");
    } catch(err) {
        console.log("Error saving company description: ", err);
        res.status(500).json("Failed to save company description data");
    }
});

router.get("/", async(req, res) => {
    try{
        console.log('--- Inside GET /api/company-description ---');
        const companyDescriptions = await CompanyDescription.find();
        res.status(200).json(companyDescriptions);
        console.log('Data fetched successfully:', companyDescriptions);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json('Failed to fetch company description data.');
    }
});

module.exports = router;