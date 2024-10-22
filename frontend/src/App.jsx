// // import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import StudentForm from './components/StudentForm'; 
// // import Content from './components/Content';
// // import Navbar from './components/Navbar';
// // import './App.css';

// // function App() {
// //   return (
// //     <Router>
// //     <div className="App">
      
// //       <Navbar /> 
// //       <Routes>
// //         <Route path="/" element={<StudentForm />} />  
// //         <Route path="/events" element={<Content />} />  

// //       </Routes>
// //     </div>
// //   </Router>
// //   );
// // }

// // export default App;


// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// // import Dashboard from "./components/Dashboard";
// import Companies from "./components/Companies";
// import Login from './components/Login';
// import Register from './components/Register';
// import SetPassword from './components/SetPassword';
// import Followup from "./components/Followup";
// import StudentDetails from "./components/StudentDetails";
// import "./App.css";
// import Content from "./components/Content";
 
// const App = () => {
//   return (
//     <Router>
//       <div className="flex flex-col h-screen w-full">
//         <Navbar />
//         <div className="flex-grow">
//           <Routes>
//           <Route path="/" element={!authStatus ? <Login /> : <Navigate to="/cdashboard" />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/set-password" element={<SetPassword />} />
//             <Route path="/cdashboard" element={<Content />} />
//             <Route path="/events" element={<Content />} />
//             <Route path="/students" element={<Followup />} />
//             <Route path="/details" element={<StudentDetails />} />
//             <Route path="/companies" element={<Companies />} />

//             {/* <Route path="/events" element={<Content />} /> */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios"; // For making API calls
import Navbar from "./components/Navbar";
import Companies from "./components/Companies";
import Login from "./components/Login";
import Register from "./components/Register";
import SetPassword from "./components/SetPassword";
import Followup from "./components/Followup";
import StudentDetails from "./components/StudentDetails";
import Content from "./components/Content";
import "./App.css"; // Import your CSS

const App = () => {
  const [authStatus, setAuthStatus] = useState(false); // To track if user is authenticated
  const [loading, setLoading] = useState(true); // To show a loading screen while fetching auth status

  // Check authentication status when the app loads
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/auth-status', { withCredentials: true })
      .then((response) => {
        setAuthStatus(response.data.isAuthenticated);
      })
      .catch((error) => {
        console.error('Error checking auth status:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  // Show loading screen while waiting for auth status to load
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col h-screen w-full">
        <Navbar authStatus={authStatus} /> {/* Pass authStatus to Navbar */}
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={!authStatus ? <Login /> : <Navigate to="/cdashboard" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/set-password" element={<SetPassword />} />

            {/* Protected Routes (Accessible only if logged in) */}
            <Route path="/cdashboard" element={<Content /> } />
            <Route path="/events" element={<Content /> } />
            <Route path="/students" element={ <Followup /> } />
            <Route path="/details" element={<StudentDetails /> } />
            <Route path="/companies" element={<Companies /> } />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
