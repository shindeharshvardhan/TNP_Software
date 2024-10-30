import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import axios from "axios";
import Navbar from "./components/coordinator/Navbar";
import MinimalNavbar from "./MinimalNavbar";
import StudentNavbar from "./components/student/NavbarStudent";
import Companies from "./components/coordinator/Companies";
import Login from "./components/coordinator/Login";
import Register from "./components/coordinator/Register";
import SetPassword from "./components/coordinator/SetPassword";
import Followup from "./components/coordinator/Followup";
import StudentDetails from "./components/coordinator/StudentDetails";
import Content from "./components/coordinator/Content";
import "./App.css";
import Landing from "./components/Landing";
import StudentForm from "./components/student/StudentForm";
import StudentLogin from "./components/student/StudentLogin";
import Company_Description_Form from "./components/coordinator/Company_Description_Form";
import FacultyDashboard from "./components/admin/FacultyDashboard";
import Dashboard from "./components/student/Dashboard";
import Loading from "./Loading";

const App = () => {
  const [authStatus, setAuthStatus] = useState(false);
  const [studentAuthStatus, setStudentAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/auth-status", {
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

  useEffect(() => {
    // Check if the student is authenticated
    axios.get("http://localhost:5000/api/students/auth-status", { withCredentials: true })
      .then(response => {
        setStudentAuthStatus(response.data.isAuthenticated);
      })
      .catch(error => {
        console.error("Error checking student auth status:", error);
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
    return <Loading />;
  }

  const backgroundClass =
    location.pathname === "/student_registration" ? "red-background" : "";

  return (
    <div className={`flex flex-col h-screen w-full ${backgroundClass}`}>
      {isPublicRoute ? <MinimalNavbar /> : <Navbar authStatus={authStatus} />}
      <div className="flex-grow">
        <Routes>
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
          <Route path="/coordinator_login" element={!authStatus ? <Login /> : <Navigate to="/cdashboard" />} />
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

          <Route path="/cdashboard" element={<Content />} />
          <Route path="/students" element={<Followup />} />
          <Route path="/details" element={<StudentDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/company_description_form" element={<Company_Description_Form />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
