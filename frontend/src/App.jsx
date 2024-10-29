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
import AdminLoginPage from "./components/admin/AdminLoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import FacultyLogin from "./components/admin/FacultyLogin";
import FacultyDashBoard from "./components/admin/FacultyDashboard";
import AssignCoordinator from "./components/admin/AssignCoordinator";
import CompanyList from "./components/admin/CompanyList";
import LoginPage from "./components/admin/LoginPage";
import ProtectedRoute from "./components/coordinator/ProtectedRoute";
import { AuthProvider } from './components/Contexts/Studentcoordinatorauth'; 
const App = () => {
  const [authStatus, setAuthStatus] = useState(false);
  const [studentAuthStatus, setStudentAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status when the app loads
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/auth/auth-status', { withCredentials: true })
  //     .then((response) => {
  //       setAuthStatus(response.data.isAuthenticated);
  //     })
  //     .catch((error) => {
  //       console.error('Error checking auth status:', error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  
  // // Show loading screen while waiting for auth status to load
  // if (loading) {
  //   return <div className="w-full h-screen flex items-center justify-center">Loading</div>;
  // }

  const backgroundClass =
    location.pathname === "/student_registration" ? "red-background" : "";

  return (
    <Router>
      <div className="flex flex-col h-screen w-full">
        <Navbar authStatus={authStatus} />
         {/* Pass authStatus to Navbar */}
        <div className="flex-grow">
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing/>}/>
            <Route path="/student_registration" element={<StudentForm/>}/>
            <Route path="/student_login" element={<StudentLogin/>}/>
            <Route path="/coordinator_login" element={!authStatus ? <Login /> : <Navigate to="/cdashboard" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/set-password" element={<SetPassword />} />

            {/* Protected Routes (Accessible only if logged in) */}
            {/* <Route path="/cdashboard" element={<Content /> } />
            <Route path="/events" element={<Content /> } />
            <Route path="/students" element={ <Followup /> } />
            <Route path="/details" element={<StudentDetails /> } />
            <Route path="/companies" element={<Companies /> } />
            <Route path="/company_description_form" element={<Company_Description_Form/>}/> */}
         
            <Route path="/cdashboard" element={<ProtectedRoute element={Content} />} />
<Route path="/events" element={<ProtectedRoute element={Content} />} />
<Route path="/students" element={<ProtectedRoute element={Followup} />} />
<Route path="/details" element={<ProtectedRoute element={StudentDetails} />} />
<Route path="/companies" element={<ProtectedRoute element={Companies} />} />
<Route path="/company_description_form" element={<ProtectedRoute element={Company_Description_Form} />} />

            <Route path="/admin/login" element={<AdminLoginPage /> } />
            {/* <Route path="/admin/login" element={<LoginPage /> } /> */}
            <Route path="/admin/dashboard" element={<AdminDashboard /> } />
            <Route path="/faculty/login" element={<FacultyLogin/> } />
            <Route path="/faculty-dashboard" element={<FacultyDashBoard/> } />
            <Route path="/faculty-dashboard/assigncompanies" element={<AssignCoordinator/> } />
            <Route path="/faculty-dashboard/companylist" element={<CompanyList/> } />

          </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
};

export default AppWrapper;
