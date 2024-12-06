// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function Rounds() {
//   const [rounds, setRounds] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [newRound, setNewRound] = useState("");
//   const [newDate, setNewDate] = useState("");
//   const [newVenue, setNewVenue] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [toggleStates, setToggleStates] = useState({});
//   const [selectedStudents, setSelectedStudents] = useState({});

//   const loc = useLocation();
//   const { company } = loc.state || {};

//   useEffect(() => {
//     if (company && company.visits.length > 0) {
//       const lastVisitRounds = company.visits[company.visits.length - 1].rounds || [];
//       setRounds(lastVisitRounds);

//       // Fetch details of all students applied across all rounds
//       const allStudentIds = [
//         ...new Set(
//           lastVisitRounds.flatMap((round) => round.studentsApplied || [])
//         ),
//       ];
//       fetchStudentDetails(allStudentIds);

//       // Initialize toggle state for all rounds
//       const initialToggleStates = lastVisitRounds.reduce((acc, round) => {
//         acc[round.id] = false;
//         return acc;
//       }, {});
//       setToggleStates(initialToggleStates);

//       // Initialize selected students state
//       const initialSelectedStudents = lastVisitRounds.reduce((acc, round) => {
//         acc[round.id] = [];
//         return acc;
//       }, {});
//       setSelectedStudents(initialSelectedStudents);
//     }
//   }, [company]);

//   const fetchStudentDetails = async (studentIds) => {
//     try {
//       const responses = await Promise.all(
//         studentIds.map((id) =>
//           fetch(`http://localhost:5000/round/addround/student/${id}`).then((res) => res.json())
//         )
//       );
//       setStudents(responses);
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//     }
//   };

//   const handleAddRound = async () => {
//     if (newRound.trim() && newDate && newVenue) {
//       const newRoundData = {
//         name: newRound,
//         date: newDate,
//         venue: newVenue,
//         studentsApplied: [],
//       };

//       try {
//         const visitId = company.visits[company.visits.length - 1]._id;

//         const response = await fetch(`http://localhost:5000/round/addround/${visitId}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newRoundData),
//         });

//         if (response.ok) {
//           const result = await response.json();
//           setRounds((prevRounds) => [
//             ...prevRounds,
//             { ...newRoundData, id: result.id, resultAnnounce: false },
//           ]);
//           setToggleStates((prevStates) => ({
//             ...prevStates,
//             [result.id]: false,
//           }));
//           setSelectedStudents((prevSelected) => ({
//             ...prevSelected,
//             [result.id]: [],
//           }));

//           setNewRound("");
//           setNewDate("");
//           setNewVenue("");
//           setShowAddForm(false);
//         } else {
//           throw new Error("Failed to add round");
//         }
//       } catch (error) {
//         console.error("Error adding round:", error);
//       }
//     }
//   };

//   const toggleRoundView = (roundId) => {
//     setToggleStates((prevStates) => ({
//       ...prevStates,
//       [roundId]: !prevStates[roundId],
//     }));
//   };

//   const handleStudentSelection = (roundId, studentId) => {
//     setSelectedStudents((prevSelected) => {
//       const selected = prevSelected[roundId] || [];
//       const isSelected = selected.includes(studentId);

//       return {
//         ...prevSelected,
//         [roundId]: isSelected
//           ? selected.filter((id) => id !== studentId) // Remove student if already selected
//           : [...selected, studentId], // Add student if not already selected
//       };
//     });
//   };

//   const handleAnnounceResults = (roundId) => {
//     const selectedForRound = selectedStudents[roundId] || [];
//     if (selectedForRound.length === 0) {
//       alert("No students selected for the next round.");
//       return;
//     }

//     const confirmation = window.confirm(
//       `The following students will proceed to the next round:\n${selectedForRound
//         .map((id) => {
//           const student = students.find((s) => s._id === id);
//           return student ? `${student.fname} ${student.lname}` : "Unknown";
//         })
//         .join("\n")}`
//     );

//     if (confirmation) {
//       fetch(`http://localhost:5000/round/announce/${company.visits[0]._id}/${roundId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ studentsCleared: selectedForRound }),
//       })
//         .then((response) => {
//           if (response.ok) {
//             alert("Results announced successfully!");
//             // Update round's resultAnnounce status to true after announcing
//             setRounds((prevRounds) =>
//               prevRounds.map((round) =>
//                 round.id === roundId ? { ...round, resultAnnounce: true } : round
//               )
//             );
//           } else {
//             throw new Error("Failed to announce results");
//           }
//         })
//         .catch((error) => console.error("Error announcing results:", error));
//     }
//   };

//   return (
//     <div className="p-8 bg-gradient-to-r from-indigo-100 via-blue-200 to-indigo-100 min-h-screen">
//       <h2 className="text-3xl font-semibold mb-6 text-gray-800">Rounds Management</h2>

//       {!showAddForm ? (
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors ease-in-out duration-200"
//         >
//           Add New Round
//         </button>
//       ) : (
//         <div className="mt-8 p-6 bg-white rounded-lg shadow-xl space-y-4">
//           <h3 className="text-2xl font-semibold text-gray-800">Create New Round</h3>
//           <input
//             type="text"
//             placeholder="Enter round name"
//             value={newRound}
//             onChange={(e) => setNewRound(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
//           />
//           <div className="flex gap-4">
//             <input
//               type="date"
//               value={newDate}
//               onChange={(e) => setNewDate(e.target.value)}
//               className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
//             />
//             <input
//               type="text"
//               placeholder="Enter venue"
//               value={newVenue}
//               onChange={(e) => setNewVenue(e.target.value)}
//               className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
//             />
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={handleAddRound}
//               className="py-2 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg"
//             >
//               Add Round
//             </button>
//             <button
//               onClick={() => setShowAddForm(false)}
//               className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {rounds.length > 0 ? (
//           rounds.map((round) => (
//             <div key={round.id} className="bg-white rounded-lg shadow-lg p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{round.name}</h3>
//               <p className="text-gray-600 mb-4">
//                 {round.date} - {round.venue}
//               </p>

//               <button
//                 className="mb-4 py-2 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg"
//                 onClick={() => toggleRoundView(round.id)}
//               >
//                 {toggleStates[round.id] ? "Hide Students" : "Show Students"}
//               </button>

//               {toggleStates[round.id] && (
//                 <div className="space-y-2">
//                   {students
//                     .filter((student) => round.studentsApplied.includes(student._id))
//                     .map((student) => (
//                       <div
//                         key={student._id}
//                         className="flex items-center justify-between py-2 border-b"
//                       >
//                         <span>{student.fname} {student.lname}</span>
//                         <button
//                           onClick={() => handleStudentSelection(round.id, student._id)}
//                           className={`py-1 px-4 text-sm rounded-full ${
//                             selectedStudents[round.id]?.includes(student._id)
//                               ? "bg-green-500 text-white"
//                               : "bg-gray-200 text-gray-700"
//                           }`}
//                         >
//                           {selectedStudents[round.id]?.includes(student._id) ? "Selected" : "Select"}
//                         </button>
//                       </div>
//                     ))}
//                 </div>
//               )}

//               <button
//                 className="mt-4 py-2 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg"
//                 disabled={round.resultAnnounce}
//                 onClick={() => handleAnnounceResults(round.id)}
//               >
//                 {round.resultAnnounce ? "Results Announced" : "Announce Results"}
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No rounds available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Rounds;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RoundItem from "./RoundItem"; // Importing the reusable RoundItem component.

function Rounds() {
  const [rounds, setRounds] = useState([]);
  const [students, setStudents] = useState([]);
  const [newRound, setNewRound] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const loc = useLocation();
  const { company } = loc.state || {};

  useEffect(() => {
    if (company && company.visits.length > 0) {
      const lastVisitRounds = company.visits[company.visits.length - 1].rounds || [];
      setRounds(lastVisitRounds);

      const allStudentIds = [
        ...new Set(lastVisitRounds.flatMap((round) => round.studentsApplied || [])),
      ];
      fetchStudentDetails(allStudentIds);
    }
  }, [company]);

  const fetchStudentDetails = async (studentIds) => {
    try {
      const responses = await Promise.all(
        studentIds.map((id) =>
          fetch(`http://localhost:5000/round/addround/student/${id}`).then((res) => res.json())
        )
      );
      setStudents(responses);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleAddRound = async () => {
    if (newRound.trim() && newDate && newVenue) {
      const newRoundData = {
        name: newRound,
        date: newDate,
        venue: newVenue,
        studentsApplied: [],
      };

      try {
        const visitId = company.visits[company.visits.length - 1]._id;
        const response = await fetch(`http://localhost:5000/round/addround/${visitId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRoundData),
        });

        if (response.ok) {
          const result = await response.json();
          setRounds((prevRounds) => [
            ...prevRounds,
            { ...newRoundData, id: result.id, resultAnnounce: false },
          ]);
          setNewRound("");
          setNewDate("");
          setNewVenue("");
          setShowAddForm(false);
        } else {
          throw new Error("Failed to add round");
        }
      } catch (error) {
        console.error("Error adding round:", error);
      }
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-100 via-blue-200 to-indigo-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Rounds Management</h2>

      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg"
        >
          Add New Round
        </button>
      ) : (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-xl space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Create New Round</h3>
          <input
            type="text"
            placeholder="Enter round name"
            value={newRound}
            onChange={(e) => setNewRound(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
          />
          <div className="flex gap-4">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
            />
            <input
              type="text"
              placeholder="Enter venue"
              value={newVenue}
              onChange={(e) => setNewVenue(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
            />
          </div>
          <button
            onClick={handleAddRound}
            className="py-2 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg"
          >
            Add Round
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rounds.length > 0 ? (
          rounds.map((round) => (
            <RoundItem
              key={round.id}
              round={round}
              company={company}
              students={students.filter((student) =>
                round.studentsApplied.includes(student._id)
              )}
              onResultAnnounce={(updatedRound) =>
                setRounds((prevRounds) =>
                  prevRounds.map((r) => (r.id === updatedRound.id ? updatedRound : r))
                )
              }
            />
          ))
        ) : (
          <p>No rounds available.</p>
        )}
      </div>
    </div>
  );
}

export default Rounds;
