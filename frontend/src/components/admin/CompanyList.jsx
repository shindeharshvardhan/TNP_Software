import React, { useEffect, useState } from "react";
import NavbarFaculty from "./NavbarFaculty";

const CompanyList = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [department, setDepartment] = useState(null); // Default to null to wait for department data

  // Fetch department from cookies
  useEffect(() => {
    const tokenString = getCookie("FcoordinatorData");

    let token = null;

    if (tokenString) {
      try {
        // Parse the cookie string into an object
        token = JSON.parse(decodeURIComponent(tokenString));
        setDepartment(token.department);
      } catch (error) {
        console.error("Error parsing cookie:", error);
      }
    }
  }, []);

  // Fetch companies once the department is available
  useEffect(() => {
    if (department) { // Only fetch companies if department is set
      const fetchCompanies = async () => {
        setLoading(true); // Set loading to true when fetching starts
        try {
          console.log("department dfgh " + department);
          const response = await fetch(
            `http://localhost:5000/cc/companies/dept/${department}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log(data); // Log the fetched data
          setCompanies(data); // Set the fetched companies
        } catch (err) {
          setError("Failed to fetch companies");
          console.error(err); // Log error details
        } finally {
          setLoading(false); // Set loading to false after fetch is complete
        }
      };

      fetchCompanies();
    }
  }, [department]); // This effect depends on the department state

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check if companies is an array before using reduce
  const groupedCompanies = Array.isArray(companies)
    ? companies.reduce((acc, company) => {
        company.visits.forEach((visit) => {
          if (!acc[visit.year]) {
            acc[visit.year] = [];
          }
          acc[visit.year].push({
            name: company.name,
            faculty: company.faculty,
            hrContactName: visit.hrContactName,
            hrContactEmail: visit.hrContactEmail,
            coordinatedBy: visit.coordinatedBy,
            coordinatorEmail: visit.coordinatorEmail,
          });
        });
        return acc;
      }, {})
    : {}; // Default to empty object if companies is not an array

  return (
    <div className="w-full h-screen">
      <NavbarFaculty />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Company List for {department} Visits</h1>
        {Object.keys(groupedCompanies).length === 0 ? (
          <div>No visits scheduled for this year.</div>
        ) : (
          Object.keys(groupedCompanies)
            .sort((a, b) => b - a) // Sort years in descending order
            .map((year) => (
              <div key={year} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{year}</h2>
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Company Name</th>
                      <th className="border border-gray-300 px-4 py-2">Department</th>
                      <th className="border border-gray-300 px-4 py-2">HR Contact Name</th>
                      <th className="border border-gray-300 px-4 py-2">HR Contact Email</th>
                      <th className="border border-gray-300 px-4 py-2">Coordinated By</th>
                      <th className="border border-gray-300 px-4 py-2">Coordinator Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedCompanies[year].map((company, index) => (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{company.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{company.faculty}</td>
                        <td className="border border-gray-300 px-4 py-2">{company.hrContactName}</td>
                        <td className="border border-gray-300 px-4 py-2">{company.hrContactEmail}</td>
                        <td className="border border-gray-300 px-4 py-2">{company.coordinatedBy}</td>
                        <td className="border border-gray-300 px-4 py-2">{company.coordinatorEmail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default CompanyList;
