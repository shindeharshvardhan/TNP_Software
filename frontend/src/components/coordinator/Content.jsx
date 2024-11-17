
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyCalendar from './MyCalendar';
import EventForm  from './EventForm';
import EventList  from './EventList';
import '../../Content.css';
import AssignedCompanies from './AssignedCompanies';
import Navbar from './Navbar';

function Content() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date from calendar
  const [loading, setLoading] = useState(true); // State for loading
  

  // Fetch events from the server when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to add a new event
const addEvent = (newEvent) => {
  try {
    // Assuming the event is successfully added
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setShowForm(false);

    // Display success message
    window.alert('Event created successfully!');
  } catch (error) {
    console.error('Error creating event:', error);

    // Display error message
    window.alert('Error occurred while creating the event. Please try again.');
  }
};


  // Filter events from today or future
  const getUpcomingEvents = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return events.filter((event) => {
      const eventDate = new Date(event.date.split('/').reverse().join('-')).setHours(0, 0, 0, 0);
      return eventDate >= today;
    });
  };

// Helper function to format a date to 'YYYY-MM-DD'
const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const getEventsForSelectedDate = () => {
  const formattedSelectedDate = formatDateToYYYYMMDD(selectedDate); // Format as YYYY-MM-DD
  return events.filter((event) => event.date === formattedSelectedDate);
};

  // Check if selected date is today
  const isTodaySelected = () => {
    const today = new Date().toLocaleDateString('en-GB'); // Format today as DD/MM/YYYY
    const selectedFormattedDate = selectedDate.toLocaleDateString('en-GB');
    return today === selectedFormattedDate;
  };

  return (
    <>
    <Navbar/>
    <div className='flex flex-row items-center w-full h-4/5 justify-center gap-32'>
      {/* Calendar Section */}
      <div className='flex flex-col items-center'>
        <MyCalendar
          onDateChange={(date) => {
            setSelectedDate(date);
          }}
          events={events} // Pass events to mark dates on the calendar
        />
        <button
          className='mt-4 p-2 bg-blue-500 text-white rounded'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Show Events' : 'Add Event'}
        </button>
      </div>

      {/* Right Section (Event List / Form) */}
      <div className='w-1/3'>
        {loading ? (
          <p>Loading events...</p>
        ) : showForm ? (
          <EventForm addEvent={addEvent} selectedDate={selectedDate} />
        ) : isTodaySelected() ? (
          <EventList content="Upcoming Events" events={getUpcomingEvents()} /> // Show upcoming events if today is selected
        ) : (
          <EventList content="Events" events={getEventsForSelectedDate()} /> // Show events for selected date
        )}

        
      </div>
    
    </div>
      <AssignedCompanies />
      </>
  );
}

export default Content;




