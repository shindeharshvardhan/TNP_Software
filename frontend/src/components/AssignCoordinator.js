import React, { useState, useEffect } from 'react';

const AssignCoordinator = () => {
  const [companies, setCompanies] = useState([]); // Initialize companies as an empty array
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoordinators, setSelectedCoordinators] = useState({});
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    faculty: '',
  });
  const currentYear = 2025; // Set current year dynamically

  // Fetch companies and coordinators
  const fetchData = () => {
    // Fetch companies filtered by department and current year
    fetch(`http://localhost:8080/cc/companies/dept/CSE`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Ensure that the data is always an array
        setCompanies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
        setLoading(false);
      });

    // Fetch current year coordinators
    fetch(`http://localhost:8080/sc?department=CSE&year=${currentYear}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCoordinators(data);
      })
      .catch((error) => console.error('Error fetching coordinators:', error));
  };

  useEffect(() => {
    fetchData(); // Call fetchData on component mount
  }, [currentYear]);

  const handleCoordinatorChange = (companyId, coordinatorId) => {
    setSelectedCoordinators((prevState) => ({
      ...prevState,
      [companyId]: coordinatorId, // Store selected coordinator ID
    }));
  };

  const handleAssignCoordinator = (companyId) => {
    const coordinatorId = selectedCoordinators[companyId];

    if (!coordinatorId) {
      alert('Please select a coordinator to assign!');
      return;
    }

    fetch(`http://localhost:8080/cc/companies/${companyId}/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinatorId: coordinatorId,
        year: currentYear,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to assign coordinator');
        }
        return response.json();
      })
      .then(() => {
        alert('Coordinator assigned successfully!');
        fetchData(); // Reload the data after successful assignment
      })
      .catch((error) => {
        console.error('Error assigning coordinator:', error);
      });
  };

  // Handle input changes for new company form
  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  // Handle new company form submission
  const handleAddCompany = (e) => {
    e.preventDefault();

    if (!newCompany.name || !newCompany.faculty) {
      alert('Please fill in both the company name and faculty!');
      return;
    }

    fetch(`http://localhost:8080/cc/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCompany),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add company');
        }
        return response.json();
      })
      .then((data) => {
        alert('Company added successfully!');
        setCompanies((prevCompanies) => [...prevCompanies, data]); // Update companies list with the new company
        setNewCompany({ name: '', faculty: '' }); // Reset the form
        setShowAddCompanyForm(false); // Hide the form after submission
      })
      .catch((error) => {
        console.error('Error adding company:', error);
      });
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="assign-coordinator">
      <h2>Assign Coordinators to Companies</h2>

      {/* Add Company Button */}
      <button
        className="btn btn-secondary"
        onClick={() => setShowAddCompanyForm((prevShow) => !prevShow)}
      >
        {showAddCompanyForm ? 'Hide Add Company' : 'Add Company'}
      </button>

      {/* Show Add Company Form if the button is clicked */}
      {showAddCompanyForm && (
        <div className="add-company mt-3">
          <h3>Add New Company</h3>
          <form onSubmit={handleAddCompany}>
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                name="name"
                value={newCompany.name}
                onChange={handleNewCompanyChange}
                placeholder="Enter company name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="faculty" className="form-label">
                Faculty
              </label>
              <input
                type="text"
                className="form-control"
                id="faculty"
                name="faculty"
                value={newCompany.faculty}
                onChange={handleNewCompanyChange}
                placeholder="Enter faculty"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      )}

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Faculty</th>
            <th>Assigned Coordinator</th>
            <th>Coordinator Email</th>
            <th>Available Coordinators</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => {
              const currentVisit = company.visits.find(visit => visit.year === currentYear);
              const assignedCoordinatorName = currentVisit ? currentVisit.coordinatedBy : null;
              const assignedCoordinatorEmail = currentVisit ? currentVisit.coordinatorEmail : null;

              return (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.faculty}</td>
                  <td>
                    {assignedCoordinatorName ? (
                      <span>{assignedCoordinatorName}</span>
                    ) : (
                      <span>Not Assigned</span>
                    )}
                  </td>
                  <td>
                    {assignedCoordinatorEmail ? (
                      <span>{assignedCoordinatorEmail}</span>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    {!assignedCoordinatorName && (
                      <select
                        className="form-select"
                        onChange={(e) => handleCoordinatorChange(company.id, e.target.value)}
                      >
                        <option value="">Select a Coordinator</option>
                        {coordinators.map((coordinator) => (
                          <option key={coordinator._id} value={coordinator._id}>
                            {coordinator.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAssignCoordinator(company.id)}
                      disabled={!!assignedCoordinatorName}
                    >
                      Assign Coordinator
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No companies available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignCoordinator;
