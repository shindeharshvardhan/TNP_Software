import React, { useState } from "react";

const Company_Description_Form = () => {
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [eligibilityUG, setEligibilityUG] = useState("");  // Eligibility for UG
  const [eligibilityPG, setEligibilityPG] = useState("");  // Eligibility for PG
  const [eligibility10th, setEligibility10th] = useState("");  // Eligibility for 10th
  const [eligibility12th, setEligibility12th] = useState("");  // Eligibility for 12th
  const [customEligibilityUG, setCustomEligibilityUG] = useState("");
  const [customEligibilityPG, setCustomEligibilityPG] = useState("");
  const [customEligibility10th, setCustomEligibility10th] = useState("");
  const [customEligibility12th, setCustomEligibility12th] = useState("");
  const [showInternshipDetails, setShowInternshipDetails] = useState(false);
  const [showTrainingDetails, setShowTrainingDetails] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const ugDepts = [
    "BSC Applied Physics", "B.Arch", "BE Chemical Engineering", "BE Civil Engineering", 
    "BE Computer Science and Engineering", "BE Electrical Engineering", "BE Electronics Engineering", 
    "BE Mechanical Engineering", "BE Metallurgical and Materials Engineering", 
    "BE Textile Engineering", "Water Resources Engineering and Management (WREM)"
  ];

  const pgDepts = [
    "MSC Applied Maths", "MSC Applied Chemistry", "MSC Applied Physics", 
    "MSC Industrial Mathematics", "MSC Financial Mathematics", "Master of Computer Applications", 
    "ME Civil Environmental Engineering", "ME Civil Fracture Mechanics", "ME Civil Geotechnical Engineering", 
    "ME Civil Highway and Transportation Engineering", "ME Civil Integrated Water Management", 
    "ME Civil Structural Engineering", "ME Civil Water Resources Engineering", "ME Electrical Automatic Control and Robotics", 
    "ME Electrical Power Engineering", "ME Electrical Industrial Engineering", "ME Electrical Microprocessor System Application", 
    "ME Mechanical Jet Propulsion and Gas Turbine Plant", "ME Mechanical Production Engineering", 
    "ME Mechanical Thermal Science", "ME Metallurgy Industrial Metallurgy", "ME Metallurgy Material Science and Engineering", 
    "ME Metallurgy Welding Technology", "ME Textile Engineering", "ME Textile Man Made Engineering", 
    "ME Textile Processing", "Master of Urban and Regional Planning"
  ];

  const handleProgramChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPrograms((prev) =>
      checked ? [...prev, name] : prev.filter((p) => p !== name)
    );
  };

  const handleEligibilityChangeUG = (event) => {
    setEligibilityUG(event.target.value);
  };

  const handleEligibilityChangePG = (event) => {
    setEligibilityPG(event.target.value);
  };

  const handleEligibilityChange10th = (event) => {
    setEligibility10th(event.target.value);
  };

  const handleEligibilityChange12th = (event) => {
    setEligibility12th(event.target.value);
  };

  const isSaveDisabled =
    eligibilityUG === "" || (eligibilityUG === "Custom" && customEligibilityUG === "") ||
    eligibility10th === "" || (eligibility10th === "Custom" && customEligibility10th === "") ||
    eligibility12th === "" || (eligibility12th === "Custom" && customEligibility12th === "") ||
    (selectedPrograms.includes("PG") && (eligibilityPG === "" || (eligibilityPG === "Custom" && customEligibilityPG === "")));

    const departments = [
      ...(selectedPrograms.includes("UG") ? ugDepts : []),
      ...(selectedPrograms.includes("PG") ? pgDepts : []),
    ];
  

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-12">
      {/* Full-width and margin from navbar */}
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Max-width container for centering */}
        <h1 className="text-3xl font-semibold mb-8 text-center">Job Form</h1>

        {/* Program Selection */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Program</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="UG"
                onChange={handleProgramChange}
                className="mr-2"
              />
              UG
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="PG"
                onChange={handleProgramChange}
                className="mr-2"
              />
              PG
            </label>
          </div>
        </div>

        {/* Departments */}
        {departments.length > 0 && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Choose Departments</label>
            <div className="grid grid-cols-2 gap-4">
              {departments.map((dept) => (
                <label key={dept} className="inline-flex items-center mr-4">
                  <input type="checkbox" name={dept} className="mr-2" />
                  {dept}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block font-medium mb-2">Job Role</label>
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Enter the job role"
          />
        </div>

        {/* Application Deadline */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Application Deadline</label>
          <input
            type="date"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        {/* CTC, Bond, Location Inputs */}
        <div className="mb-4">
          <label className="block font-medium mb-2">CTC</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Bond</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Location</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        {/* Eligibility Criteria for UG (shown if UG or PG is selected) */}
        {(selectedPrograms.includes("UG") || selectedPrograms.includes("PG")) && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Eligibility Criteria (UG)</label>
            <select
              value={eligibilityUG}
              onChange={handleEligibilityChangeUG}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            >
              <option value="">Select Eligibility</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="All">All</option>
              <option value="Custom">Custom</option>
            </select>

            {eligibilityUG === "Custom" && (
              <input
                type="number"
                value={customEligibilityUG}
                onChange={(e) => setCustomEligibilityUG(e.target.value)}
                placeholder="Enter custom percentage"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none"
              />
            )}
          </div>
        )}

        {/* Eligibility Criteria for PG (shown if PG is selected) */}
        {selectedPrograms.includes("PG") && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Eligibility Criteria (PG)</label>
            <select
              value={eligibilityPG}
              onChange={handleEligibilityChangePG}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            >
              <option value="">Select Eligibility</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="All">All</option>
              <option value="Custom">Custom</option>
            </select>

            {eligibilityPG === "Custom" && (
              <input
                type="number"
                value={customEligibilityPG}
                onChange={(e) => setCustomEligibilityPG(e.target.value)}
                placeholder="Enter custom percentage"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none"
              />
            )}
          </div>
        )}

        {/* Eligibility Criteria for 10th (shown if UG or PG is selected) */}
        {(selectedPrograms.includes("UG") || selectedPrograms.includes("PG")) && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Eligibility Criteria (10th)</label>
            <select
              value={eligibility10th}
              onChange={handleEligibilityChange10th}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            >
              <option value="">Select Eligibility</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="All">All</option>
              <option value="Custom">Custom</option>
            </select>

            {eligibility10th === "Custom" && (
              <input
                type="number"
                value={customEligibility10th}
                onChange={(e) => setCustomEligibility10th(e.target.value)}
                placeholder="Enter custom percentage"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none"
              />
            )}
          </div>
        )}

        {/* Eligibility Criteria for 12th (shown if UG or PG is selected) */}
        {(selectedPrograms.includes("UG") || selectedPrograms.includes("PG")) && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Eligibility Criteria (12th)</label>
            <select
              value={eligibility12th}
              onChange={handleEligibilityChange12th}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            >
              <option value="">Select Eligibility</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="All">All</option>
              <option value="Custom">Custom</option>
            </select>

            {eligibility12th === "Custom" && (
              <input
                type="number"
                value={customEligibility12th}
                onChange={(e) => setCustomEligibility12th(e.target.value)}
                placeholder="Enter custom percentage"
                className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none"
              />
            )}
          </div>
        )}

        {/* Internship Section */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Is Internship Offered?</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="internship"
                value="yes"
                onChange={() => setShowInternshipDetails(true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="internship"
                value="no"
                onChange={() => setShowInternshipDetails(false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {showInternshipDetails && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Internship Duration (months)</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />

            <label className="block font-medium mb-2 mt-4">Internship Stipend</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
        )}

        {/* Training Section */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Is Training Offered?</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="training"
                value="yes"
                onChange={() => setShowTrainingDetails(true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="training"
                value="no"
                onChange={() => setShowTrainingDetails(false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {showTrainingDetails && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Training Duration (months)</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />

            <label className="block font-medium mb-2 mt-4">Training Stipend</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
        )}

        {/* Other Details */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Other Details</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            rows="4"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              isSaveDisabled ? "bg-gray-400" : "bg-blue-500"
            }`}
            disabled={isSaveDisabled}
          >
            Save
          </button>
          <button className="px-4 py-2 rounded-md bg-green-500 text-white">
            Eligible Students List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Company_Description_Form;
