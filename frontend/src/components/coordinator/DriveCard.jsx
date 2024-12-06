import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import axios from "axios";

function DriveCard({ company, status }) {
  const navigate = useNavigate();
  const [notificationSent, setNotificationSent] = useState(
    company?.visits?.[0]?.notify || false
  );
  const [driveStatus, setDriveStatus] = useState(status);

  // Function to send message to eligible students
  const sendMsg = async () => {
    const visitId = company?.visits?.[0]?._id;
    if (!visitId) {
      alert("Visit ID not found.");
      return;
    }

    try {
      const tenthEligibility = company?.visits?.[0]?.tenthEligibility?.slice(0, -1);
      const twelfthEligibility = company?.visits?.[0]?.twelfthEligibility?.slice(0, -1);

      await axios.post("http://localhost:5000/sdr/send-message", {
        eligibleDepartments: company?.visits?.[0]?.eligibleDepartments,
        tenthEligibility: Number(tenthEligibility),
        twelfthEligibility: Number(twelfthEligibility),
        companyId: company._id,
        visitYear: company.visits[0].year,
      });

      const response = await axios.put(
        `http://localhost:5000/cc/companies/${company._id}/notify/${visitId}`
      );

      if (response.status === 200) {
        setNotificationSent(true);
        alert("Notification sent and status updated successfully.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  // Handle drive completion
  const handleCompleteDrive = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/cc/companies/${company._id}/complete-drive`
      );

      if (response.status === 200) {
        setDriveStatus("Completed");
        alert("Drive marked as completed successfully.");
      }
    } catch (error) {
      console.error("Error completing drive:", error);
      alert("Failed to complete the drive.");
    }
  };

  // Navigate to the Company Description page
  const handleCompanyDescriptionClick = () => {
    navigate("/company_description_form", { state: { companyName: company.name, company } });
  };

  // Navigate to Rounds page
  const handleRoundsClick = () => {
    navigate("/rounds", { state: { company } });
  };

  // Navigate to Show Students page
  const handleShowStudentsClick = () => {
    navigate("/students", { state: { companyId: company._id } });
  };
  const handleShowResultsClick = () => {
    navigate("/results", { state: { company } });
  };
  const handleCompleteClick = () => {
    navigate("/complete", { state: { company } });
  };

  const isCompleted = driveStatus === "Completed";

  return (
    <div
      key={company._id}
      className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200"
    >
      <h5 className="text-lg font-semibold mb-2">{company.name}</h5>

      {/* Notification Button */}
      <div className="flex items-center space-x-2">
        <AiOutlineBell
          size={24}
          className={`cursor-pointer ${
            notificationSent || isCompleted ? "text-green-600" : "text-gray-600"
          }`}
          onClick={notificationSent || isCompleted ? null : sendMsg}
          title={
            isCompleted
              ? "Drive Completed"
              : notificationSent
              ? "Notification Already Sent"
              : "Send Notification to Eligible Students"
          }
          style={{ cursor: notificationSent || isCompleted ? "not-allowed" : "pointer" }}
        />
        <span>
          {notificationSent ? "Notification Sent" : "Notify Students"}
        </span>
      </div>

      <p className="mt-2 text-gray-600">
        <strong>Status:</strong> {driveStatus}
      </p>

      {/* Buttons for actions */}
      <div className="mt-4 space-x-2">
        <button
          onClick={handleCompanyDescriptionClick}
          disabled={isCompleted}
          className={`py-2 px-4 font-semibold rounded-lg shadow-sm ${
            isCompleted
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Company Description
        </button>

        <button
          onClick={() => alert("Announcements feature is under development.")}
          disabled={isCompleted}
          className={`py-2 px-4 font-semibold rounded-lg shadow-sm ${
            isCompleted
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
        >
          Announcements
        </button>

        <button
          onClick={handleRoundsClick}
          disabled={isCompleted}
          className={`py-2 px-4 font-semibold rounded-lg shadow-sm ${
            isCompleted
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          Rounds
        </button>

        {/* Conditional Button: Complete Drive or Show Students */}
        {isCompleted ? (
          <button
            onClick={handleShowResultsClick}
            className="py-2 px-4 bg-purple-100 text-purple-700 font-semibold rounded-lg shadow-sm hover:bg-purple-200"
          >
            Show Students
          </button>
        ) : (
          <button
            onClick={handleCompleteClick}
            className="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg shadow-sm hover:bg-red-200"
          >
            Complete Drive
          </button>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <small
          className={driveStatus === "Completed" ? "text-green-600" : "text-red-600"}
        >
          {driveStatus}
        </small>
      </div>
    </div>
  );
}

export default DriveCard;
