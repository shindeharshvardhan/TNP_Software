import React from "react";
import RoundItem from "./RoundItem";

function Round({ rounds }) {
  return (
    <div className="p-8 bg-gradient-to-r from-indigo-100 via-blue-200 to-indigo-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Rounds Management</h2>
      
      <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rounds.length > 0 ? (
          rounds.map((round) => (
            <RoundItem key={round.id} round={round} />
          ))
        ) : (
          <p>No rounds available.</p>
        )}
      </div>
    </div>
  );
}

export default Round;
