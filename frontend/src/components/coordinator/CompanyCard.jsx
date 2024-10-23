import React from "react";

const CompanyCard = ({ company }) => {
  // Log the company prop to verify the visits data
  console.log('Company data:', company);

  if (!company) {
    return <p>No company selected.</p>;
  }

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{company.name}</h2>
      <p className="text-gray-700">{company.department}</p>

      <div className="mt-2">
        <h3 className="font-semibold">Visits:</h3>
        {company.visits && company.visits.length > 0 ? (
          company.visits.map((visit, index) => (
            <div key={index} className="mt-2">
              <p><strong>Year:</strong> {visit.year}</p>
              <p><strong>HR Contact:</strong> {visit.hrContactName} ({visit.hrContactEmail})</p>
              <p><strong>Job Locations:</strong> {visit.job_loc.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No visit data available.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
