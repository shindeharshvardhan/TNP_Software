import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/coordinator/Navbar";
import Companies from "./components/coordinator/Companies";
import Login from "./components/coordinator/Login";
import Register from "./components/coordinator/Register";
import SetPassword from "./components/coordinator/SetPassword";
import Followup from "./components/coordinator/Followup";
import "./App.css";
import Content from "./components/coordinator/Content";
import { NavLink } from "react-router-dom";
import StudentDetails from "./components/coordinator/StudentDetails";

// Minimal Navbar Component (for login, register, set-password)
const MinimalNavbar = () => (
  <div className="navbar pt-3 pl-16 pr-16 text-neutral-950">
    <div className="navbar-start text-3xl font-semibold">
      T&P FTE
    </div>

    <div className="navbar-end">
      <NavLink to="/help" className="btn btn-ghost text-lg">
        Need Help?
      </NavLink>
    </div>
  </div>
);

const App = () => {
  // Get current path
  const location = useLocation();

  // Check for login, register, or set-password paths
  const showMinimalNavbar = ["/", "/register", "/set-password"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Conditionally render the minimal or full Navbar */}
      {showMinimalNavbar ? <MinimalNavbar /> : <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/events" element={<Content />} />
          <Route path="/students" element={<Followup />} />
          <Route path="/details" element={<StudentDetails />} />
          <Route path="/companies" element={<Companies />} />
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
