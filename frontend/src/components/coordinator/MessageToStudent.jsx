import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function MessageToStudent() {
  // Get the company data from the location
  const loc = useLocation();
  const company = loc.state?.company;  // Accessing company data from the state passed via React Router
  console.log(company);

  // Check the conditions
  const hasTenthEligibility = company?.visits?.[0]?.tenthEligibility;
  const hasNoMessages = true; // Set this to check the messages condition if needed

  // Function to send message to eligible students
  const sendMsg = async () => {
    // Remove the last character of tenthEligibility and twelfthEligibility
    const tenthEligibility = company?.visits?.[0]?.tenthEligibility?.slice(0, -1); // Removing the last character
    const twelfthEligibility = company?.visits?.[0]?.twelfthEligibility?.slice(0, -1); // Removing the last character

    console.log('Tenth Eligibility:', tenthEligibility);
    console.log('Twelfth Eligibility:', twelfthEligibility);

    try {
      // Call the backend API to send messages to eligible students
      const response = await axios.post('http://localhost:5000/sdr/send-message', {
        eligibleDepartments: company?.visits?.[0]?.eligibleDepartments,
        tenthEligibility: Number(tenthEligibility), // Convert to number after removing last char
        twelfthEligibility: Number(twelfthEligibility) // Convert to number after removing last char
      });

      // Handle response and update UI (you could also log this data if needed)
      console.log(response.data);
      
      // Update the state to show the message is sent (you can add this logic as per your state)
      setMessageSent(true);
      setStudentsToSendMsg(response.data.data);
    } catch (error) {
      console.error('Error sending message to students:', error);
    }
  };

  return (
    <div className="pt-24"> {/* Adding padding to leave space for the navbar */}
      <div className="container mx-auto">
        {/* Only show the button if conditions are met */}
        {hasTenthEligibility && hasNoMessages && (
          <button
            className="btn btn-primary"
            onClick={sendMsg}
          >
            Send Message to Eligible Students
          </button>
        )}
      </div>
    </div>
  );
}
