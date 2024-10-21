import React, { useState, useEffect } from 'react';
import './style.css';  // Custom CSS for additional styling
// import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap for styling

const AdminDashboard = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [newCoordinators, setNewCoordinators] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing coordinator data
  useEffect(() => {
    fetch('http://localhost:8080/fc')
      .then(res => res.json())
      .then(data => setCoordinators(data))
      .catch(error => console.error('Error fetching coordinators:', error));
  }, []);

  // Add a new coordinator for the next year (+1 year)
  const handleAddNewYear = () => {
    if (coordinators.length === 0) {
      alert('No coordinator data available.');
      return;
    }

    const lastYear = Math.max(...coordinators.map(c => c.year));
    const nextYear = lastYear + 1;

    // Pre-fill coordinator data from the last year for the new year (+1)
    const lastYearData = coordinators.filter(c => c.year === lastYear);
    const prefilledCoordinators = lastYearData.map(coordinator => ({
      ...coordinator,
      year: nextYear,
       // Clear the email for the new year
    }));

    setNewCoordinators(prefilledCoordinators);
    setSelectedYear(nextYear);
  };

  const handleSubmitNewYear = () => {
    setLoading(true);
    fetch('http://localhost:8080/fc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year: selectedYear, coordinators: newCoordinators }),
    })
      .then(res => res.json())
      .then(() => {
        alert('Coordinators added successfully');
        setLoading(false);
        setSelectedYear(null);
        setNewCoordinators([]);
      })
      .catch(error => {
        console.error('Error adding coordinators:', error);
        setLoading(false);
      });
  };

  const handleCoordinatorChange = (index, field, value) => {
    const updatedCoordinators = [...newCoordinators];
    updatedCoordinators[index][field] = value;
    setNewCoordinators(updatedCoordinators);
  };

  // Group coordinators by year
  const groupedByYear = coordinators.reduce((acc, coordinator) => {
    if (!acc[coordinator.year]) {
      acc[coordinator.year] = [];
    }
    acc[coordinator.year].push(coordinator);
    return acc;
  }, {});

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Admin Dashboard</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar and Content */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <span data-feather="home"></span>
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file"></span>
                    Coordinators
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="shopping-cart"></span>
                    Reports
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
            </div>

            {/* List past years with coordinator details in a table */}
            <h3>Past Years</h3>
            {Object.keys(groupedByYear).map((year) => (
              <div key={year} className="mb-4">
                <h4>Year: {year}</h4>
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedByYear[year].map((coordinator, index) => (
                      <tr key={index}>
                        <td>{coordinator.name}</td>
                        <td>{coordinator.email}</td>
                        <td>{coordinator.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            {/* Add new year */}
            <div className="card mb-4">
              <div className="card-body">
                <h3>Add Coordinators for Year {Math.max(...coordinators.map(c => c.year)) + 1}</h3>
                <button className="btn btn-primary" onClick={handleAddNewYear}>Add Coordinators for Next Year</button>
              </div>
            </div>

            {/* Display editable coordinator fields if a new year is selected */}
            {selectedYear && (
              <div className="card">
                <div className="card-body">
                  <h3>Edit Coordinators for {selectedYear}</h3>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newCoordinators.map((coordinator, index) => (
                        <tr key={index}>
                          <td>
                            <input 
                              type="text" 
                              className="form-control"
                              value={coordinator.name} 
                              onChange={(e) => handleCoordinatorChange(index, 'name', e.target.value)} 
                            />
                          </td>
                          <td>
                            <input 
                              type="email" 
                              className="form-control"
                              value={coordinator.email} 
                              onChange={(e) => handleCoordinatorChange(index, 'email', e.target.value)} 
                            />
                          </td>
                          <td>{coordinator.department}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="btn btn-success" onClick={handleSubmitNewYear} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit New Year'}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
