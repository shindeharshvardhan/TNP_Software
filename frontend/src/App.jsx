import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import necessary routing components
import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import FacultyLogin from "./components/admin/FacultyLogin";
import FacultyDashboard from "./components/admin/FacultyDashboard";
import AssignCoordinator from "./components/admin/AssignCoordinator";
import CompanyList from "./components/admin/CompanyList";

function App() {
  return (
    <div className="w-full h-full text-neutral-950">
      <BrowserRouter>
        {" "}
        {/* Wrap your app with BrowserRouter */}
        <Routes>
          <Route path="/login" element={<FacultyLogin />} />{" "}
          {/* Route for Faculty Login */}
          <Route path="/" element={<AdminDashboard />} />{" "}
          {/* Route for Admin Dashboard */}
          <Route
            path="/faculty-dashboard"
            element={<FacultyDashboard />}
          />{" "}
          {/* Route for Admin Dashboard */}
          <Route
            path="/faculty-dashboard/assign-coordinator"
            element={<AssignCoordinator />}
          />{" "}
          {/* Route for Admin Dashboard */}
          <Route
            path="/faculty-dashboard/company-list"
            element={<CompanyList />}
          />{" "}
          {/* Route for Admin Dashboard */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
