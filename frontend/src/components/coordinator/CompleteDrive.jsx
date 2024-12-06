import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function CompleteDrive() {
  const loc = useLocation();
  const { company } = loc.state || {}; // Extract company data from state

  const [clearedStudents, setClearedStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [offerLetters, setOfferLetters] = useState({}); // State to track offer letters for each student

  useEffect(() => {
    if (company && company.visits.length > 0) {
      // Get the last visit (most recent visit)
      const lastVisit = company.visits[company.visits.length - 1];
      console.log(lastVisit);

      if (lastVisit.rounds.length > 0) {
        // Get the last round (most recent round)
        const lastRound = lastVisit.rounds[lastVisit.rounds.length - 1];
        console.log(lastRound);

        // Get the list of cleared students from the last round
        const clearedStudentIds = lastRound.studentsCleared;
        console.log(clearedStudentIds);

        // Fetch student details for these cleared students' IDs
        const fetchClearedStudents = async () => {
          try {
            // Use Promise.all to fetch each student's details concurrently
            const studentRequests = clearedStudentIds.map((id) =>
              axios.get(`http://localhost:5000/round/addround/student/${id}`)
            );

            // Wait for all requests to resolve
            const responses = await Promise.all(studentRequests);

            // Extract the data from each response and update state
            const students = responses.map((response) => response.data);
            setClearedStudents(students); // Set the list of cleared students

            setLoading(false); // Stop loading once data is fetched
          } catch (error) {
            console.error('Error fetching cleared students:', error);
            setLoading(false); // Stop loading if there's an error
          }
        };

        fetchClearedStudents();
      }
    }
  }, [company]);

  // Handle file change and store offer letters for each student
  const handleFileChange = (e, studentId) => {
    const file = e.target.files[0];
    if (file) {
      setOfferLetters((prev) => ({
        ...prev,
        [studentId]: file,
      }));
    }
  };

  // Submit offer letters to the server
  const handleSubmit = async () => {
    try {
console.log("called")
      const promises = clearedStudents.map(async (student) => {
        const offerLetter = offerLetters[student._id];
        if (offerLetter) {
          const formData = new FormData();
          formData.append('companyId', company._id);
          formData.append('visitYear', company.visits[company.visits.length - 1].year);
          formData.append('studentId', student._id);
        //   formData.append('document', offerLetter);
            console.log("fff")
          // Call the API to submit the offer letter
          await axios.post('http://localhost:5000/offer/addOfferLetter', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
      });

      // Wait for all API requests to complete
      await Promise.all(promises);
      alert('Offer letters submitted successfully!');
    } catch (error) {
      console.error('Error submitting offer letters:', error);
      alert('Failed to submit offer letters.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Students Cleared in the Last Round</h2>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading students...</p>
      ) : clearedStudents.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-700">First Name</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Email</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Department</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Offer Letter</th>
            </tr>
          </thead>
          <tbody>
            {clearedStudents.map((student) => (
              <tr key={student._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">{student.fname}</td>
                <td className="py-3 px-4 text-gray-800">{student.email}</td>
                <td className="py-3 px-4 text-gray-800">{student.ugData.department}</td>
                <td className="py-3 px-4">
                  <input
                    type="file"
                    name="offerLetter"
                    onChange={(e) => handleFileChange(e, student._id)}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-lg text-gray-600">No students cleared in the last round</p>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Offer Letters
        </button>
      </div>
    </div>
  );
}
