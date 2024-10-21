import React, { useState, useEffect } from "react";
import axios from "axios";

function EventForm({ addEvent, selectedDate }) {
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading...not used yet

  // Set date in YYYY-MM-DD format
  useEffect(() => {
    const formattedDate = formatDateToYYYYMMDD(selectedDate);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      date: formattedDate,
    }));
  }, [selectedDate]);

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to create a new event
      const response = await axios.post(
        "http://localhost:5000/api/events",
        newEvent
      );

      // Clear the form fields and show success message
      setNewEvent({ name: "", date: "", description: "" });
      console.log("Event added:", response.data);
      setMessage("Event created successfully!");

      addEvent(response.data); // Add the event to the event list
    } catch (error) {
      setMessage("Error creating event");
      console.error("Error adding event:", error);
    }
  };

  return (
    <div>
      <form
        className="p-4 border border-gray-300 rounded"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-4">Add New Event</h2>
        <label>
          Name of event:
          <input
            type="text"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="glassmorphism text-blue border p-2 mt-1 mb-4 w-full"
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="glassmorphism text-blue border p-2 mt-1 mb-4 w-full"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            className="glassmorphism text-blue border p-2 mt-1 mb-4 w-full"
            required
          />
        </label>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default EventForm;
