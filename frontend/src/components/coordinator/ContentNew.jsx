import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/Studentcoordinatorauth"; // Adjust the path as necessary
import DriveCard from "./DriveCard";
import ProgressTracker from "./ProgressTracker";


export default function AssignedCompanies() {
  const { studentCoordinatorId } = useAuth();
  const [assignedCompanies, setAssignedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState({ view: "list", company: null });

  useEffect(() => {
    const fetchAssignedCompanies = async () => {
      if (!studentCoordinatorId) {
        setError("No student coordinator ID available");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/cc/companies/${studentCoordinatorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch assigned companies");
        }
        const data = await response.json();
        setAssignedCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCompanies();
  }, [studentCoordinatorId]);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">Error: {error}</div>;
  }

  if (currentView.view === "progress") {
    return (
      <div className="w-full h-full pt-32 px-4 flex justify-center items-center">
         
        <div className="w-1/2 flex flex-col justify-center items-center">
          <ProgressTracker company={currentView.company} />
          <button
            onClick={() => setCurrentView({ view: "list", company: null })}
            className="mt-6 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  const completedCompanies = assignedCompanies.filter((company) =>
    company.visits.some((visit) => visit.completed)
  );

  const pendingCompanies = assignedCompanies.filter((company) =>
    company.visits.some((visit) => !visit.completed)
  );

  return (
    <div className="w-full h-full pt-32 px-4 flex justify-center items-center">
      <div className="w-1/2 flex flex-col justify-center items-center gap-6">
      
        {/* Pending Companies */}
        <div className="w-full">
          <h4 className="text-xl font-semibold mb-4">Pending Companies</h4>
          {pendingCompanies.length > 0 ? (
            pendingCompanies.map((company) => (
              <DriveCard
                key={company._id}
                company={company}
                status="Pending"
                onTaskClick={() =>
                  setCurrentView({ view: "progress", company })
                }
              />
            ))
          ) : (
            <p className="text-gray-600">No pending companies assigned.</p>
          )}
        </div>

        {/* Completed Companies */}
        <div className="w-full">
          <h4 className="text-xl font-semibold mb-4">Completed Companies</h4>
          {completedCompanies.length > 0 ? (
            completedCompanies.map((company) => (
              <DriveCard
                key={company._id}
                company={company}
                status="Completed"
                onTaskClick={() =>
                  setCurrentView({ view: "progress", company })
                }
              />
            ))
          ) : (
            <p className="text-gray-600">No completed companies assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
}
