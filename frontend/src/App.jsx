import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import axios from "axios"; // For making API calls
import Navbar from "./components/coordinator/Navbar";
import StudentNavbar from "./components/student/NavbarStudent"; // Import StudentNavbar
import Companies from "./components/coordinator/Companies";
import Login from "./components/coordinator/Login";
import Register from "./components/coordinator/Register";
import SetPassword from "./components/coordinator/SetPassword";
import Followup from "./components/coordinator/Followup";
import StudentDetails from "./components/coordinator/StudentDetails";
import Content from "./components/coordinator/Content";
import { Navigate } from "react-router-dom";
import "./App.css"; // Import your CSS
import Landing from "./components/Landing";
import StudentForm from "./components/student/StudentForm";
import StudentLogin from "./components/student/StudentLogin";
import Company_Description_Form from "./components/coordinator/Company_Description_Form";
import Dashboard from "./components/student/Dashboard";

const App = () => {
  const [authStatus, setAuthStatus] = useState(false); // To track if user is authenticated
  const [studentAuthStatus, setStudentAuthStatus] = useState(false);
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

  useEffect(() => {
    const checkStudentAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/students/auth-status",
          { withCredentials: true }
        );
        setStudentAuthStatus(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking student auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStudentAuthStatus();
  }, []);

  // // Show loading screen while waiting for auth status to load
  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading</div>;
  }

  return (
    <Router>
      <div className="flex flex-col h-screen w-full">
        <Navbar authStatus={authStatus} /> {/* Pass authStatus to Navbar */}
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route
              path="/student_registration"
              element={
                studentAuthStatus ? (
                  <Navigate to="/student_dashboard" />
                ) : (
                  <StudentForm />
                )
              }
            />
            <Route
              path="/student_login"
              element={
                !studentAuthStatus ? (
                  <StudentLogin setStudentAuthStatus={setStudentAuthStatus} />
                ) : (
                  <Navigate to="/student_dashboard" />
                )
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route
              path="/student_dashboard"
              element={
                studentAuthStatus ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/student_login" />
                )
              }
            />

            {/* Protected Routes (Accessible only if logged in) */}
            <Route path="/cdashboard" element={<Content />} />
            <Route path="/events" element={<Content />} />
            <Route path="/students" element={<Followup />} />
            <Route path="/details" element={<StudentDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company_description_form" element={<Company_Description_Form />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;