import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/coordinator/Navbar";
import StudentNavbar from "./components/student/NavbarStudent"; // Import StudentNavbar
import Companies from "./components/coordinator/Companies";
import Login from "./components/coordinator/Login";
import Register from "./components/coordinator/Register";
import SetPassword from "./components/coordinator/SetPassword";
import Followup from "./components/coordinator/Followup";
import "./App.css";
import Content from "./components/coordinator/Content";
import StudentForm from "./components/student/StudentForm";
import StudentLogin from "./components/student/StudentLogin";
import { NavLink } from "react-router-dom";
import StudentDetails from "./components/coordinator/StudentDetails";
import NavbarStudent from "./components/student/NavbarStudent";
import MinimalNavbar from "./MinimalNavbar";



const App = () => {
  // Get current path
  const location = useLocation();

  // Check for login, register, or set-password paths (coordinator)
  const showMinimalNavbar = ["/", "/register", "/set-password", "/coordinator_login", "/student_login"].includes(
    location.pathname
  );

  // Check for student paths (student_registration and student_login)
  const showStudentNavbar = ["/student_registration", "/student_login"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Conditionally render the appropriate Navbar */}
      {showMinimalNavbar ? (
        <MinimalNavbar />
      ) : showStudentNavbar ? (
        <NavbarStudent />
      ) : (
        <Navbar />
      )}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/coordinator_login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/events" element={<Content />} />
          <Route path="/students" element={<Followup />} />
          <Route path="/details" element={<StudentDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/student_registration" element={<StudentForm />} />
          <Route path="/student_login" element={<StudentLogin />} />
        </Routes>
      </div>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
