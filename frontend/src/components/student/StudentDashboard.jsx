import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Content.css';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // For default styles

function StudentDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [filteredNotifications, setFilteredNotifications] = useState([]); // Store filtered notifications

  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students/notifications', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotifications(response.data);
        setLoading(false);

        // Extract the dates from the notifications and convert them to Date objects
        const dates = response.data.map(notification => new Date(notification.date).toLocaleDateString());
        setHighlightedDates(dates);

        // Initially filter notifications for today's date or no date selected
        setFilteredNotifications(response.data.filter(notification =>
          new Date(notification.date).toLocaleDateString() === new Date().toLocaleDateString()
        ));
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to check if a date is highlighted
  const tileClassName = ({ date }) => {
    const dateString = date.toLocaleDateString();
    return highlightedDates.includes(dateString) ? 'highlighted-date' : null;
  };

  // Handle date selection
  const handleDateClick = (date) => {
    const selectedDateString = date.toLocaleDateString();
    setSelectedDate(selectedDateString);

    // Filter notifications based on the selected date
    const notificationsForSelectedDate = notifications.filter(notification =>
      new Date(notification.date).toLocaleDateString() === selectedDateString
    );
    setFilteredNotifications(notificationsForSelectedDate);
  };

  return (
    <>
      <div className='text-center mt-32 flex justify-between items-center px-16'>
        <Link to="/student_notification">
          <button className="not-btn p-4 m-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            Notifications
          </button>
        </Link>
        <Link to="/my_applications">
          <button className="app-btn p-4 m-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            My Applications
          </button>
        </Link>
      </div>

      <div className="flex flex-row items-start justify-center gap-16 px-16">
        {/* Calendar Section */}
        <div className="calendar-container w-1/3">
          <Calendar
            tileClassName={tileClassName}
            defaultValue={new Date()}
            onClickDay={handleDateClick} // Set the handler for date click
          />
        </div>

        {/* Notifications Section */}
        <div className='flex flex-col items-center w-2/3 h-3/5 justify-center gap-8'>
          {loading ? (
            <p>Loading notifications...</p>
          ) : (
            filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <div key={index} className="notification-card bg-gray-100 p-6 m-4 rounded-lg shadow-md w-full">
                  <h3 className="text-lg font-bold mb-2 text-indigo-600">{notification.companyName}</h3>
                  <p className="text-gray-700">Round: <strong>{notification.roundName}</strong></p>
                  <p className="text-gray-700">Date: <strong>{new Date(notification.date).toLocaleDateString()}</strong></p>
                  <p className="text-gray-700">Venue: <strong>{notification.venue}</strong></p>
                </div>
              ))
            ) : (
              <p>No notifications available for this date.</p>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
