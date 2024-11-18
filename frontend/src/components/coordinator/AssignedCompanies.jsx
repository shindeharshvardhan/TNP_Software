import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/Studentcoordinatorauth'; // Adjust the path as necessary

export default function AssignedCompanies() {
  const { studentCoordinatorId } = useAuth(); // Get the studentCoordinatorId from context
  const [assignedCompanies, setAssignedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedCompanies = async () => {
      if (!studentCoordinatorId) {
        setError('No student coordinator ID available');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/cc/companies/${studentCoordinatorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assigned companies');
        }
        const data = await response.json();
        console.log("this is data"+data);
        setAssignedCompanies(data); // Assume the response data is an array of companies
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCompanies();
  }, [studentCoordinatorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Separate companies into completed and pending based on the visit status
  const completedCompanies = assignedCompanies.filter(company => 
    company.visits.some(visit => visit.completed)
  );

  const pendingCompanies = assignedCompanies.filter(company => 
    company.visits.some(visit => !visit.completed)
  );

  return (
    <div className="container mt-4">
      <h2>Assigned Companies</h2>
      <div className="row">
        {/* Completed Companies */}
        <div className="col-md-6">
          <h4>Completed Companies</h4>
          {completedCompanies.length > 0 ? (
            completedCompanies.map(company => (
              <div key={company._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{company.name}</h5>
                  <p className="card-text">
                    <strong>Status:</strong> Completed
                  </p>
                  {/* Add more details as needed */}
                  <div className="d-flex justify-content-between align-items-center">
                    <a href={`#`} className="btn btn-primary">View Details</a>
                    <small className="text-success">Completed</small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No completed companies assigned.</p>
          )}
        </div>

        {/* Pending Companies */}
        <div className="col-md-6">
          <h4>Pending Companies</h4>
          {pendingCompanies.length > 0 ? (
            pendingCompanies.map(company => (
              <div key={company._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{company.name}</h5>
                  <p className="card-text">
                    <strong>Status:</strong> Pending
                  </p>
                  {/* Add more details as needed */}
                  <div className="d-flex justify-content-between align-items-center">
                    <a href={`#`} className="btn btn-primary">View Details</a>
                    <small className="text-danger">Pending</small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No pending companies assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
}
