import React, { useState, useEffect } from 'react';

export default function CompanyCard() {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [department, setDepartment] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedVisits, setSelectedVisits] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const tokenString = getCookie("FcoordinatorData");
    let token = null;
    if (tokenString) {
      try {
        token = JSON.parse(decodeURIComponent(tokenString));
        setDepartment(token.department);
      } catch (error) {
        console.error("Error parsing cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (department) {
      const fetchCompanies = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/cc/companies/dept/${department}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCompanies(data);
        } catch (err) {
          setError("Failed to fetch companies");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCompanies();
    }
  }, [department]);

  const handleCardClick = (company) => {
    // Only update selected company and visits if there are visits
    if (company.visits && company.visits.length > 0) {
      setSelectedCompany(company);
      setSelectedVisits(company.visits);
    } else {
      setSelectedCompany(company);
      setSelectedVisits([]); // Reset visits to empty array if no visits
    }
  };

  const handleCloseModal = () => {
    setSelectedCompany(null); // Close modal by resetting selected company
    setSelectedVisits([]); // Reset selected visits
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter visits based on the selected year
  const filteredVisits = selectedYear
    ? selectedVisits.filter(visit => visit.year === selectedYear)
    : selectedVisits;

  return (
    <div>
      <h1>Company Card</h1>

      {companies.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="border p-4 rounded shadow-lg cursor-pointer"
              onClick={() => handleCardClick(company)}
            >
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p>Faculty: {company.faculty}</p>
              <p>Number of Visits: {company.visits.length}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No companies found for this department.</p>
      )}

      {/* Modal for visit information */}
      {selectedCompany && selectedVisits.length > 0 && (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded shadow-lg w-3/4 relative">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-lg font-bold text-gray-600"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">Visit Information for {selectedCompany.name}</h2>

            {/* Dropdown to filter by year */}
            <div className="mb-4">
              <label htmlFor="year" className="mr-2 text-xl">Select Year:</label>
              <select
                id="year"
                value={selectedYear || ""}
                onChange={handleYearChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">-- Select a Year --</option>
                {selectedVisits.map((visit, index) => (
                  <option key={index} value={visit.year}>{visit.year}</option>
                ))}
              </select>
            </div>

            {/* Display visit details */}
            <div className="mt-4">
              {filteredVisits.length === 0 ? (
                <p>No visits found for this year.</p>
              ) : (
                filteredVisits.map((visit, index) => (
                  <div key={index} className="border-b py-2">
                    <p><strong>Year:</strong> {visit.year}</p>
                    <p><strong>HR Contact:</strong> {visit.hrContactName} ({visit.hrContactEmail})</p>
                    <p><strong>Coordinated By:</strong> {visit.coordinatedBy}</p>
                    <p><strong>Coordinator Email:</strong> {visit.coordinatorEmail}</p>
                    <p><strong>CTC:</strong> {visit.ctc || "Not Provided"}</p>
                    <p><strong>Job Role:</strong> {visit.jobRole || "Not Specified"}</p>
                    <p><strong>Location:</strong> {visit.location || "Not Specified"}</p>
                    <p><strong>Is Internship Offered?</strong> {visit.isInternshipOffered ? "Yes" : "No"}</p>
                    <p><strong>Internship Duration:</strong> {visit.internshipDuration || "Not Specified"}</p>
                    <p><strong>Internship Stipend:</strong> {visit.internshipStipend || "Not Provided"}</p>
                    <p><strong>Extra Details:</strong> {visit.extraDetails || "None"}</p>
                    <p><strong>10th Eligibility:</strong> {visit.tenthEligibility || "Not Specified"}</p>
                    <p><strong>12th Eligibility:</strong> {visit.twelfthEligibility || "Not Specified"}</p>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
