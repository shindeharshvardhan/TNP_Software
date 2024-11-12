import React, { useState } from 'react';
import MyCalendar from '../coordinator/MyCalendar';
import ProgressTracker from './ProgressTracker';

function StudentDashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]); // Initialize events as an empty array

  return (
    <div className='mt-48 flex flex-row justify-evenly'>
      <div className=''>
        <MyCalendar
          onDateChange={(date) => {
            setSelectedDate(date);
          }}
          events={events} 
        />
      </div>
      <div className=''>
        <ProgressTracker />
      </div>
    </div>
  );
}

export default StudentDashboard;
