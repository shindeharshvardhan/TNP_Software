//old one
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar({ onDateChange, events }) {
  const [date, setDate] = useState(new Date());

  // Handle date change
  const handleDateChange = (newDate) => {
    // Ensure that only the date part is considered (strip time components)
    const adjustedDate = new Date(newDate.setHours(0, 0, 0, 0));
    setDate(adjustedDate);
    onDateChange(adjustedDate); // Notify parent component about the date change
  };

  // Function to format date to 'YYYY-MM-DD' in local time
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  // Check if a date has any events and display a red marker
  const tileContent = ({ date }) => {
    const formattedDate = formatDateToYYYYMMDD(date); // Format calendar date
    const hasEvent = events.some((event) => event.date === formattedDate);
    return hasEvent ? (
      <span className="event-marker" style={{ color: 'red' }}>●</span>
    ) : null;
  };
  
  
  return (
    <div className='flex flex-col justify-center items-center gap-3'>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
}

export default MyCalendar;







