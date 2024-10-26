import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import axios from "axios"; // For making API calls
import Navbar from "./components/coordinator/Navbar";
import MinimalNavbar from "./MinimalNavbar";
import StudentNavbar from "./components/student/NavbarStudent"; // Import StudentNavbar
import Companies from "./components/coordinator/Companies";
import Login from "./components/coordinator/Login";
import Register from "./components/coordinator/Register";
import SetPassword from "./components/coordinator/SetPassword";
import Followup from "./components/coordinator/Followup";
import StudentDetails from "./components/coordinator/StudentDetails";
import Content from "./components/coordinator/Content";
import "./App.css"; // Import your CSS
import Landing from "./components/Landing";
import StudentForm from "./components/student/StudentForm";
import StudentLogin from "./components/student/StudentLogin";
import Company_Description_Form from "./components/coordinator/Company_Description_Form";
import FacultyDashboard from "./components/admin/FacultyDashboard";
import Loading from "./Loading";

const App = () => {
  const [authStatus, setAuthStatus] = useState(false); // Track if the user is authenticated
  const [loading, setLoading] = useState(true); // Show a loading screen while fetching auth status

  const location = useLocation(); // Moved outside any conditional rendering

  useEffect(() => {
    axios
      .get("http://localhost:5173/api/auth/auth-status", {
        withCredentials: true,
      })
      .then((response) => {
        setAuthStatus(response.data.isAuthenticated);
      })
      .catch((error) => {
        console.error("Error checking auth status:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isPublicRoute = [
    "/",
    "/student_registration",
    "/student_login",
    "/coordinator_login",
    "/register",
    "/set-password",
  ].includes(location.pathname);

  if (loading) {
    return <Loading />; // Ensure you're returning the Loading component when loading is true
  }

  // Apply red background only for /student_registration route
  const backgroundClass =
    location.pathname === "/student_registration" ? "red-background" : "";

  return (
    <div className={`flex flex-col h-screen w-full ${backgroundClass}`}>
      {isPublicRoute ? <MinimalNavbar /> : <Navbar authStatus={authStatus} />}
      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/student_registration" element={<StudentForm />} />
          <Route path="/student_login" element={<StudentLogin />} />
          <Route
            path="/coordinator_login"
            element={!authStatus ? <Login /> : <Navigate to="/cdashboard" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<SetPassword />} />

          {/* Protected Routes (Accessible only if logged in) */}
          <Route path="/cdashboard" element={<Content />} />
          <Route path="/students" element={<Followup />} />
          <Route path="/details" element={<StudentDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route
            path="/company_description_form"
            element={<Company_Description_Form />}
          />
        </Routes>
      </div>
    </div>
  );
};

// Wrap the App component with Router for useLocation
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
