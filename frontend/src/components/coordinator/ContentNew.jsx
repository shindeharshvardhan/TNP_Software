// import React, { useEffect, useState } from "react";
// import { useAuth } from "../Contexts/Studentcoordinatorauth"; // Adjust the path as necessary
// import DriveCard from "./DriveCard";
// import ProgressTracker from "./ProgressTracker";
// import MyCalendar from "./MyCalendar";


// export default function ContentNew() {
//   const { studentCoordinatorId } = useAuth();
//   const [assignedCompanies, setAssignedCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentView, setCurrentView] = useState({ view: "list", company: null });
//   // const handleDateChange = (newDate) => {
//   //   // Ensure that only the date part is considered (strip time components)
//   //   const adjustedDate = new Date(newDate.setHours(0, 0, 0, 0));
//   //   setDate(adjustedDate);
//   //   onDateChange(adjustedDate); // Notify parent component about the date change
//   // };

//   // // Function to format date to 'YYYY-MM-DD' in local time
//   // const formatDateToYYYYMMDD = (date) => {
//   //   const year = date.getFullYear();
//   //   const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero
//   //   const day = ('0' + date.getDate()).slice(-2); // Add leading zero
//   //   return `${year}-${month}-${day}`;
//   // };
//   useEffect(() => {
//     const fetchAssignedCompanies = async () => {
//       if (!studentCoordinatorId) {
//         setError("No student coordinator ID available");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `http://localhost:5000/cc/companies/${studentCoordinatorId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch assigned companies");
//         }
//         const data = await response.json();
//         setAssignedCompanies(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignedCompanies();
//   }, [studentCoordinatorId]);

//   if (loading) {
//     return <div className="text-center py-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-6">Error: {error}</div>;
//   }

//   if (currentView.view === "progress") {
//     return (
//       <div className="w-full h-full pt-32 px-4 flex justify-center items-center">
         
//         <div className="w-1/2 flex flex-col justify-center items-center">
//           <ProgressTracker company={currentView.company} />
//           <button
//             onClick={() => setCurrentView({ view: "list", company: null })}
//             className="mt-6 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg"
//           >
//             Back to Companies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const completedCompanies = assignedCompanies.filter((company) =>
//     company.visits.some((visit) => visit.completed)
//   );

//   const pendingCompanies = assignedCompanies.filter((company) =>
//     company.visits.some((visit) => !visit.completed)
//   );

//   return (
    
    
//     <div className="w-full h-full pt-32 px-4 flex justify-center items-center">
//        {/* <MyCalendar
//           onDateChange={(date) => {
//             setSelectedDate(date);
//           }}
//           events={events} // Pass events to mark dates on the calendar
//         /> */}
//       <div className="w-1/2 flex flex-col justify-center items-center gap-6">
      
//         {/* Pending Companies */}
//         <div className="w-full">
//           <h4 className="text-xl font-semibold mb-4">Pending Companies</h4>
//           {pendingCompanies.length > 0 ? (
//             pendingCompanies.map((company) => (
//               <DriveCard
//                 key={company._id}
//                 company={company}
//                 status="Pending"
//                 onTaskClick={() =>
//                   setCurrentView({ view: "progress", company })
//                 }
//               />
//             ))
//           ) : (
//             <p className="text-gray-600">No pending companies assigned.</p>
//           )}
//         </div>

//         {/* Completed Companies */}
//         <div className="w-full">
//           <h4 className="text-xl font-semibold mb-4">Completed Companies</h4>
//           {completedCompanies.length > 0 ? (
//             completedCompanies.map((company) => (
//               <DriveCard
//                 key={company._id}
//                 company={company}
//                 status="Completed"
//                 onTaskClick={() =>
//                   setCurrentView({ view: "progress", company })
//                 }
//               />
//             ))
//           ) : (
//             <p className="text-gray-600">No completed companies assigned.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/Studentcoordinatorauth";
import DriveCard from "./DriveCard";
import ProgressTracker from "./ProgressTracker";
import MyCalendar from "./MyCalendar";
import EventList from "./EventList";
import "../../Content.css";

export default function ContentNew() {
  const { studentCoordinatorId } = useAuth();
  const [assignedCompanies, setAssignedCompanies] = useState([]);
  const [tasksByCompany, setTasksByCompany] = useState({});
  const [events, setEvents] = useState([]); // Events for calendar
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState({
    view: "list",
    company: null,
  });
  const [error, setError] = useState(null);

  // Fetch assigned companies
  useEffect(() => {
    const fetchAssignedCompanies = async () => {
      if (!studentCoordinatorId) {
        setError("No student coordinator ID available");
        setLoadingCompanies(false);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/cc/companies/${studentCoordinatorId}`
        );
        if (!response.ok) throw new Error("Failed to fetch assigned companies");
        const data = await response.json();
        setAssignedCompanies(data);
        console.log(JSON.stringify(assignedCompanies, null, 2));  // Pretty print the entire object

        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchAssignedCompanies();
  }, [studentCoordinatorId]);

  // Fetch tasks for all assigned companies
  useEffect(() => {
    const fetchTasksForCompanies = async () => {
      if (assignedCompanies.length === 0) return;

      try {
        const tasksByCompanyMap = {};
        const eventDates = [];

        for (const company of assignedCompanies) {
          const response = await fetch(
            `http://localhost:5000/api/events/company/${company._id}/tasks`
          );
          if (!response.ok)
            throw new Error(`Failed to fetch tasks for ${company.name}`);

          const tasks = await response.json();
          tasksByCompanyMap[company._id] = tasks || [];

          tasks.forEach((task) => {
            if (task.date) {
              // Ensure the date is formatted as YYYY-MM-DD
              const formattedDate = new Date(task.date)
                .toISOString()
                .split("T")[0];
              eventDates.push({
                date: formattedDate,
                title: task.taskName,
                company: company.name,
              });
            }
          });
        }

        setTasksByCompany(tasksByCompanyMap);
        setEvents(eventDates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingTasks(false);
        setLoadingEvents(false);
      }
    };
    fetchTasksForCompanies();
  }, [assignedCompanies]);
console.log(assignedCompanies+"ccc")
  // Filter events for the selected date
  const getEventsForSelectedDate = () => {
    const formatDateToLocalYYYYMMDD = (date) => {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDateToLocalYYYYMMDD(selectedDate);
    return events.filter((event) => event.date === formattedDate);
  };

  const formatDateToDDMMYY = (dateString) => {
    const date = new Date(dateString); // Parse the date string
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = String(date.getFullYear()); // Get last two digits of year
    return `${day}/${month}/${year}`;
  };

  // Left section: Calendar and Events
  const renderLeftSection = () => (
    <div className="w-1/2 flex flex-col items-center gap-6">
      <MyCalendar
        onDateChange={(date) => setSelectedDate(date)}
        events={events} // Pass events to mark dates on the calendar
      />
      <div className="w-full flex justify-center items-center">
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : (
          <EventList
            content={`Events for ${formatDateToDDMMYY(selectedDate)}`}
            events={getEventsForSelectedDate()}
          />
        )}
      </div>
    </div>
  );

  // Right section: Companies
  const renderRightSection = () => {
    if (loadingCompanies) return <div>Loading companies...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    if (currentView.view === "progress") {
      return (
        <div className="w-full h-full flex flex-col items-center">
          <ProgressTracker company={currentView.company} />
          <button
            onClick={() => setCurrentView({ view: "list", company: null })}
            className="mt-6 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg"
          >
            Back to Companies
          </button>
        </div>
      );
    }

    const completedCompanies = assignedCompanies.filter((company) =>
      company.visits.some((visit) => visit.completed)
    
    );
    const pendingCompanies = assignedCompanies.filter((company) =>
      company.visits.some((visit) => !visit.completed)
    );

    return (
      <div className="w-1/2 flex flex-col gap-6 h-[calc(100vh-8rem)] overflow-y-scroll">
        {/* Pending Companies */}
        <div className="w-5/6">
          <h4 className="text-xl font-semibold mb-4">Pending Companies</h4>
          {pendingCompanies.length > 0 ? (
            pendingCompanies.map((company) => (
              <DriveCard
                key={company._id}
                company={company}
                status="Pending"
                tasks={tasksByCompany[company._id] || []}
                onTaskClick={() =>
                  setCurrentView({ view: "progress", company })
                }
              />
            ))
          ) : (
            <p>No pending companies assigned.</p>
          )}
        </div>

        {/* Completed Companies */}
        <div className="w-5/6">
          <h4 className="text-xl font-semibold mb-4">Completed Companies</h4>
          {completedCompanies.length > 0 ? (
            completedCompanies.map((company) => (
              <DriveCard
                key={company._id}
                company={company}
                status="Completed"
                tasks={tasksByCompany[company._id] || []}
                onTaskClick={() =>
                  setCurrentView({ view: "progress", company })
                }
              />
            ))
          ) : (
            <p>No completed companies assigned.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-screen pt-32 px-2 gap-2 overflow-hidden">
      {renderLeftSection()}
      {renderRightSection()}
    </div>
  );
}

