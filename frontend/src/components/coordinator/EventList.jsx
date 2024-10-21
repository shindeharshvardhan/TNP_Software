import React, { useState } from 'react';
import Event from './Event';
import TaskForm from './TaskForm';
import ActivityForm from './ActivityForm';

function EventList({ content, events }) {
  const [showForm, setShowForm] = useState(null); // State to track which form to show
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track the selected event

  const handleUpdateClick = (type, event) => {
    setSelectedEvent(event);
    setShowForm(type); // 'task' or 'activity'
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission logic here
    console.log('Form Submitted:', formData);
    setShowForm(null); // Close form after submission
    setSelectedEvent(null);
  };

  return (
    <div>
      <h2 className='text-xl mb-4'>{content}</h2>

      {showForm && selectedEvent ? (
        showForm === 'task' ? (
          <TaskForm event={selectedEvent} onSubmit={handleFormSubmit} />
        ) : (
          <ActivityForm event={selectedEvent} onSubmit={handleFormSubmit} />
        )
      ) : (
        <div className="h-96 overflow-auto bg-transparent"> {/* Add a fixed height and overflow */}
          {events.map((event) => (
            <Event key={event.id} event={event} onUpdateClick={handleUpdateClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
