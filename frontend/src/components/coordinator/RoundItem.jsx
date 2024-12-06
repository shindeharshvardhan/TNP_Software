// import React, { useState } from "react";

// function RoundItem({ round }) {
//   const [toggleStudents, setToggleStudents] = useState(false);
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const toggleRoundView = () => {
//     setToggleStudents(!toggleStudents);
//   };

//   const handleStudentSelection = (studentId) => {
//     setSelectedStudents((prevSelected) => {
//       const isSelected = prevSelected.includes(studentId);
//       return isSelected
//         ? prevSelected.filter((id) => id !== studentId)
//         : [...prevSelected, studentId];
//     });
//   };

//   const handleAnnounceResults = () => {
//     if (selectedStudents.length === 0) {
//       alert("No students selected for the next round.");
//       return;
//     }

//     const confirmation = window.confirm(
//       `The following students will proceed to the next round:\n${selectedStudents.join("\n")}`
//     );

//     if (confirmation) {
//       // Perform the result announcement logic here, e.g., update the database
//       alert("Results announced successfully!");
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h3 className="text-xl font-semibold text-gray-800 mb-2">{round.name}</h3>
//       <p className="text-gray-600 mb-4">
//         {round.date} - {round.venue}
//       </p>

//       <button
//         onClick={toggleRoundView}
//         className="mb-4 py-2 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg"
//       >
//         {toggleStudents ? "Hide Students" : "Show Students"}
//       </button>

//       {toggleStudents && (
//         <div className="space-y-2">
//           {round.students.map((student) => (
//             <div key={student.id} className="flex items-center justify-between py-2 border-b">
//               <span>{student.name}</span>
//               <button
//                 onClick={() => handleStudentSelection(student.id)}
//                 className={`py-1 px-4 text-sm rounded-full ${
//                   selectedStudents.includes(student.id)
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {selectedStudents.includes(student.id) ? "Selected" : "Select"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <button
//         onClick={handleAnnounceResults}
//         className="mt-4 py-2 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg"
//         disabled={round.resultAnnounce}
//       >
//         {round.resultAnnounce ? "Results Announced" : "Announce Results"}
//       </button>
//     </div>
//   );
// }

// export default RoundItem;
import React, { useState } from "react";

function RoundItem({ round, students, onResultAnnounce, company }) {
  const [toggleStudents, setToggleStudents] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleToggleView = () => setToggleStudents(!toggleStudents);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAnnounceResults = () => {
    if (selectedStudents.length === 0) {
      alert("No students selected for the next round.");
      return;
    }

    // Confirmation message for the admin
    const confirmation = window.confirm(
      `The following students will proceed to the next round:\n${selectedStudents
        .map((id) => {
          const student = students.find((s) => s._id === id);
          return student ? `${student.fname} ${student.lname}` : "Unknown";
        })
        .join("\n")}`
    );

    if (confirmation) {
      // API request to announce results
      fetch(
        `http://localhost:5000/round/announce/${company.visits[company.visits.length - 1]._id}/${round._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentsCleared: selectedStudents }),
        }
      )
        .then((response) => {
          if (response.ok) {
            alert("Results announced successfully!");
            onResultAnnounce(round._id);
          } else {
            throw new Error("Failed to announce results");
          }
        })
        .catch((error) => {
          console.error("Error announcing results:", error);
          alert("An error occurred while announcing the results. Please try again.");
        });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold">{round.name}</h3>
      <p>{`${round.date} - ${round.venue}`}</p>

      <button
        onClick={handleToggleView}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        {toggleStudents ? "Hide Students" : "Show Students"}
      </button>

      {toggleStudents && (
        <div className="mt-4">
          {students.map((student) => (
            <div
              key={student._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {student.fname} {student.lname}
              </span>
              <button
                onClick={() => handleStudentSelection(student._id)}
                className={`px-4 py-1 rounded ${
                  selectedStudents.includes(student._id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {selectedStudents.includes(student._id)
                  ? "Selected"
                  : "Select"}
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAnnounceResults}
        disabled={round.resultAnnounce}
        className={`mt-4 px-6 py-2 ${
          round.resultAnnounce
            ? "bg-gray-300"
            : "bg-green-500 text-white"
        } rounded-lg`}
      >
        {round.resultAnnounce ? "Results Announced" : "Announce Results"}
      </button>
    </div>
  );
}

export default RoundItem;
