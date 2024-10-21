import React, { useState, useEffect } from 'react';
import './style.css'; // Custom CSS for additional styling

const FacultyDashboard = () => {
  const [studentCoordinators, setStudentCoordinators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newStudentCoordinator, setNewStudentCoordinator] = useState({ name: '', email: '', department: '', year: '' });
  const [department, setDepartment] = useState('');

  useEffect(() => {
    const storedDepartment = localStorage.getItem('department');
    if (storedDepartment) {
      console.log(storedDepartment);
      setDepartment(storedDepartment);
    }
  }, []);

  useEffect(() => {
    if (department) {
      fetch(`http://localhost:8080/sc?department=${department}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("this is data");
          console.log(data);
          setStudentCoordinators(data);
        })
        .catch((error) => console.error('Error fetching student coordinators:', error));
    }
  }, [department]);

  const handleAddCoordinator = () => {
    setLoading(true);
    fetch('http://localhost:8080/sc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudentCoordinator),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add coordinator, server responded with status: ' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setStudentCoordinators([...studentCoordinators, data]);
        setNewStudentCoordinator({ name: '', email: '', department: '', year: '' });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error adding student coordinator:', error);
        setLoading(false);
      });
  };

  const handleRemoveCoordinator = (email) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this coordinator?');
    if (confirmDelete) {
      fetch(`http://localhost:8080/sc/${email}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to remove coordinator, server responded with status: ' + res.status);
          }
          return res.json();
        })
        .then(() => {
          setStudentCoordinators(studentCoordinators.filter((coordinator) => coordinator.email !== email));
        })
        .catch((error) => console.error('Error removing student coordinator:', error));
    }
  };

  return (
    <div className="faculty-dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Faculty Dashboard</a>
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

      {/* Main Content with Sidebar */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav id="sidebar" className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Manage Coordinators
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Company Details
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Manage Student Coordinators</h1>
            </div>

            {/* Department Info */}
            <h3>Department: {department}</h3>

            {/* Add New Student Coordinator */}
            <div className="card mb-4">
              <div className="card-body">
                <h3>Add Student Coordinator</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newStudentCoordinator.name}
                    onChange={(e) => setNewStudentCoordinator({ ...newStudentCoordinator, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={newStudentCoordinator.email}
                    onChange={(e) => setNewStudentCoordinator({ ...newStudentCoordinator, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newStudentCoordinator.department}
                    onChange={(e) => setNewStudentCoordinator({ ...newStudentCoordinator, department: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newStudentCoordinator.year}
                    onChange={(e) => setNewStudentCoordinator({ ...newStudentCoordinator, year: e.target.value })}
                  />
                </div>
                <button className="btn btn-success" onClick={handleAddCoordinator} disabled={loading}>
                  {loading ? 'Adding...' : 'Add Coordinator'}
                </button>
              </div>
            </div>

            {/* List Student Coordinators */}
            <h3>Student Coordinators List</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentCoordinators.length > 0 ? (
                  studentCoordinators.map((coordinator, index) => (
                    <tr key={index}>
                      <td>{coordinator.name}</td>
                      <td>{coordinator.email}</td>
                      <td>{coordinator.department}</td>
                      <td>{coordinator.year}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleRemoveCoordinator(coordinator.email)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No coordinators found for the given criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
