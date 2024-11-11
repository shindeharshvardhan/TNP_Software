import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const CompanyCard = ({ company, onBack }) => {
  // Log the company prop to verify the visits data
  console.log("Company data:", company);

  if (!company) {
    return <p className="text-center mt-8">No company selected.</p>;
  }

  return (
    <div className="relative flex justify-center items-center w-full h-full p-6">
      <div className="w-full bg-white border p-6 rounded-lg shadow-xl relative">
        <button
          className="absolute top-4 right-4 rounded-full p-2 border-2 border-black hover:bg-black hover:text-white"
          onClick={onBack}
        >
          <IoIosArrowBack/>
        </button>
        {/* Company Info with Logo Placeholder */}
        <div className="flex items-center mb-4">
          {/* Logo placeholder */}
          <div className="w-20 h-20 bg-gray-200 rounded mr-4 flex items-center justify-center">
            {/* Placeholder text for logo, you can replace this with an <img> in the future */}
            <span className="text-gray-500">Logo</span>
          </div>

          {/* Company name and department */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{company.name}</h2>
            <p className="text-lg text-gray-600">{company.department}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Events</h3>
          {company.visits && company.visits.length > 0 ? (
            [...company.visits].reverse().map((visit, index) => (
              <div key={index} className="mt-4 p-4 border-t">
                <p className="text-gray-700">
                  <strong>Year:</strong> {visit.year}
                </p>
                <p className="text-gray-700">
                  <strong>HR Contact:</strong> {visit.hrContactName} (
                  {visit.hrContactEmail})
                </p>
                <p className="text-gray-700">
                  <strong>Job Locations:</strong> {visit.job_loc.join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No visit data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
