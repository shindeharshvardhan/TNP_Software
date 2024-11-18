import React, { useState } from "react";

function ProgressTracker({ company, stage_no = 2 }) {
  const [companyProgress, setCompanyProgress] = useState({
    name: company.name,
    stages: ["Applied", "Drive Going", "Drive Completed", "Result"],
    currentStage: stage_no,
  });

  const numberOfTasks = companyProgress.stages.length;
  const currentTask = companyProgress.currentStage;

  // Progress visualizer function
  const renderProgressVisualizer = () => {
    return (
      <div className="flex justify-center items-center mb-2">
        {Array.from({ length: numberOfTasks }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Each bubble */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-center text-sm font-bold ${
                index <= currentTask
                  ? "bg-green-500 text-white"
                  : "border-2 border-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            {/* Line connector */}
            {index < numberOfTasks - 1 && (
              <div
                className={`w-10 h-1 ${
                  index < currentTask
                    ? "bg-green-500"
                    : "bg-gray-300"
                } mx-2`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const handleNextStage = () => {
    setCompanyProgress((prev) =>
      prev.currentStage < prev.stages.length - 1
        ? { ...prev, currentStage: prev.currentStage + 1 }
        : prev
    );
  };

  const handlePrevStage = () => {
    setCompanyProgress((prev) =>
      prev.currentStage > 0
        ? { ...prev, currentStage: prev.currentStage - 1 }
        : prev
    );
  };

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="bg-white p-6 md:px-16 mb-4 rounded-lg shadow-md">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">
          {companyProgress.name}
        </h2>
        {/* Render progress visualizer */}
        {renderProgressVisualizer()}
        {/* Stage labels */}
        <div className="flex justify-between w-full mb-10">
          {companyProgress.stages.map((stage, index) => (
            <div
              key={index}
              className={`text-sm font-medium ${
                index <= currentTask
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {stage}
            </div>
          ))}
        </div>
        {/* Navigation buttons */}
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handlePrevStage}
            disabled={currentTask === 0}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              currentTask === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextStage}
            disabled={currentTask === numberOfTasks - 1}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              currentTask === numberOfTasks - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
