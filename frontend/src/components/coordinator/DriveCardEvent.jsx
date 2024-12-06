import React, { useState } from "react";

function DriveCardEvent({ company, sameId, handleOnClick }) {
  return (
    <div
      key={company._id}
      className={`glassmorphism-2 rounded-lg shadow-md p-6 ${
        sameId ? "border-r-8 border-indigo-500" : "border-2 border-gray-300"
      } `}
      onClick={handleOnClick}
    >
      <h5 className="text-lg font-semibold mb-2">{company.name}</h5>
    </div>
  );
}

export default DriveCardEvent;
