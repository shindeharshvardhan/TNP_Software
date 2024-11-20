import React, { useState, useEffect } from "react";
import NavbarFaculty from "./NavbarFaculty";

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
    setSelectedCompany(company);
    setSelectedVisits(company.visits || []);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
    setSelectedVisits([]);
    setSelectedYear(null);
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

  const filteredVisits = selectedYear
    ? selectedVisits.filter((visit) => visit.year == selectedYear)
    : selectedVisits;

  return (
    <div>
      <NavbarFaculty/>
      <h1 className="text-2xl font-bold mb-4">Company Card</h1>

      {companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
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

      {/* Modal */}
      {selectedCompany && (
        <div className="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded shadow-lg w-3/4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-lg font-bold text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Visit Information for {selectedCompany.name}
            </h2>

            {/* Year Filter */}
            <div className="mb-4">
              <label htmlFor="year" className="block text-lg font-medium">
                Select Year:
              </label>
              <select
                id="year"
                value={selectedYear || ""}
                onChange={handleYearChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select a Year --</option>
                {selectedVisits.map((visit, index) => (
                  <option key={index} value={visit.year}>
                    {visit.year}
                  </option>
                ))}
              </select>
            </div>

            {/* Visit Details */}
            <div>
              {filteredVisits.length > 0 ? (
                filteredVisits.map((visit, index) => (
                  <div key={index} className="mb-4 border-b pb-4">
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
              ) : (
                <p>No visits found for this year.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
