import React, { useEffect, useState } from 'react';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:8080/cc/companies/dept/CSE');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the fetched data
        setCompanies(data);
      } catch (err) {
        setError('Failed to fetch companies');
        console.error(err); // Log error details
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

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
    <div>
      <h1>Company List for CSE Visits</h1>
      {Object.keys(groupedCompanies).length === 0 ? (
        <div>No visits scheduled for this year.</div>
      ) : (
        // Sort years in descending order
        Object.keys(groupedCompanies)
          .sort((a, b) => b - a) // Sort years in descending order
          .map((year) => (
            <div key={year}>
              <h2>{year}</h2>
              <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Department</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>HR Contact Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>HR Contact Email</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Coordinated By</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Coordinator Email</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedCompanies[year].map((company, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.faculty}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.hrContactName}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.hrContactEmail}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.coordinatedBy}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.coordinatorEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
      )}
    </div>
  );
};

export default CompanyList;
