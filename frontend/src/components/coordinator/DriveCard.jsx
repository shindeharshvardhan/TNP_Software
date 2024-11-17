import React, { useState } from "react";
import TaskForm from "./TaskForm"; // Import TaskForm component
import ActivityForm from "./ActivityForm"; // Import ActivityForm component
import { useNavigate } from "react-router-dom";


function DriveCard({ company, status, onTaskClick }) {
  const navigate = useNavigate();

  // State to track visibility of the TaskForm and ActivityForm
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [isActivityFormVisible, setIsActivityFormVisible] = useState(false);

  // Toggle TaskForm visibility
  const toggleTaskForm = () => {
    setIsTaskFormVisible(!isTaskFormVisible);
  };

  // Toggle ActivityForm visibility
  const toggleActivityForm = () => {
    setIsActivityFormVisible(!isActivityFormVisible);
  };

  const handleCompanyDescriptionClick = () => {
    navigate("/company_description_form", { state: { companyName: company.name } });
  };

  return (
    <div
      key={company._id}
      className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200"
    >
      <h5 className="text-lg font-semibold mb-2">{company.name}</h5>
      <p className="mt-2 text-gray-600">
        <strong>Status:</strong> {status}
      </p>
      <div className="mt-4 space-x-2">
        <button
          onClick={handleCompanyDescriptionClick}
          className="py-2 px-4 bg-blue-100 text-blue-700 font-semibold rounded-lg shadow-sm hover:bg-blue-200"
        >
          Company Description
        </button>

        <button
          onClick={toggleTaskForm} // Toggle task form visibility
          className="py-2 px-4 bg-green-100 text-green-700 font-semibold rounded-lg shadow-sm hover:bg-green-200"
        >
          {isTaskFormVisible?"Hide Tasks":"Show Tasks"}
        </button>

        <button
          onClick={toggleActivityForm} // Toggle activity form visibility
          className="py-2 px-4 bg-yellow-100 text-yellow-700 font-semibold rounded-lg shadow-sm hover:bg-yellow-200"
        >
          Update Activities
        </button>
      </div>

      <div className="flex justify-between items-center mt-4">
        <a
          href="#"
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          View Details
        </a>
        <small
          className={status === "Completed" ? "text-green-600" : "text-red-600"}
        >
          {status}
        </small>
      </div>

      {/* Conditionally render the TaskForm and ActivityForm based on state */}
      {isTaskFormVisible && (
        <TaskForm company={company} onSubmit={(data) => console.log(data)} />
      )}

      {isActivityFormVisible && (
        <ActivityForm company={company} onSubmit={(data) => console.log(data)} />
      )}

      
    </div>
  );
}

export default DriveCard;
