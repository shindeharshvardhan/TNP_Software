import React from "react";

function Event({ event, onUpdateClick }) {
  return (
    <div className="block border p-4 mb-4 rounded flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{event.name}</h3>
        <p className="text-gray-600">Date: {event.date}</p>
        <p className="text-gray-600">{event.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="border border-indigo-600 text-indigo-600 py-1 px-3 rounded hover:bg-blue-700"
          onClick={() => onUpdateClick('task', event)}
        >
          Update Task
        </button>
        <button
          className="bg-indigo-500 text-white py-1 px-3 rounded hover:bg-green-700"
          onClick={() => onUpdateClick('activity', event)}
        >
          Update Activity
        </button>
      </div>
    </div>
  );
}

export default Event;
