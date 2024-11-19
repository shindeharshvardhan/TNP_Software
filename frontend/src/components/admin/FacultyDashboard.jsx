import React, { useState, useEffect } from "react";
import NavbarFaculty from "./NavbarFaculty";
import CompanyCard from "./CompanyCard";

// Helper function to get cookie value by name
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

const FacultyDashboard = () => {
  const [studentCoordinators, setStudentCoordinators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newStudentCoordinator, setNewStudentCoordinator] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });
  const [department, setDepartment] = useState("");

  // Fetch department and year from cookies
  useEffect(() => {
    const tokenString = getCookie("FcoordinatorData");

    let token = null;

    if (tokenString) {
      try {
        // Parse the cookie string into an object
        token = JSON.parse(decodeURIComponent(tokenString));
        setDepartment(token.department);
        setNewStudentCoordinator((prevState) => ({
          ...prevState,
          department: token.department, // Set department from cookie
          year: token.year || "", // Set year from cookie if available
        }));
      } catch (error) {
        console.error("Error parsing cookie:", error);
      }
    }
  }, []);

  // Fetch student coordinators based on the department from the cookie
  useEffect(() => {
    if (department) {
      fetch(`http://localhost:5000/sc?department=${department}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Student coordinators data:", data);
          setStudentCoordinators(data);
        })
        .catch((error) =>
          console.error("Error fetching student coordinators:", error)
        );
    }
  }, [department]);

  const handleAddCoordinator = () => {
    setLoading(true);
    fetch("http://localhost:5000/sc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudentCoordinator),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to add coordinator, server responded with status: " +
              res.status
          );
        }
        return res.json();
      })
      .then((data) => {
        setStudentCoordinators([...studentCoordinators, data]);
        setNewStudentCoordinator({
          name: "",
          email: "",
          department: "",
          year: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error adding student coordinator:", error);
        setLoading(false);
      });
  };

  const handleRemoveCoordinator = (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this coordinator?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:5000/sc/${email}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              "Failed to remove coordinator, server responded with status: " +
                res.status
            );
          }
          return res.json();
        })
        .then(() => {
          setStudentCoordinators(
            studentCoordinators.filter(
              (coordinator) => coordinator.email !== email
            )
          );
        })
        .catch((error) =>
          console.error("Error removing student coordinator:", error)
        );
    }
  };

  return (
    <>
      <NavbarFaculty />
      <div className="faculty-dashboard">
        {/* Main Content with Sidebar */}
        <div className="flex">
          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-white">
            <div className="mb-6 border-b pb-4">
              <h1 className="text-2xl font-semibold">Manage Student Coordinators</h1>
            </div>

            {/* Department Info */}
            <h3 className="text-xl font-semibold mb-4">Department: {department}</h3>

            {/* Add New Student Coordinator */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Add Student Coordinator</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newStudentCoordinator.name}
                  onChange={(e) =>
                    setNewStudentCoordinator({
                      ...newStudentCoordinator,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newStudentCoordinator.email}
                  onChange={(e) =>
                    setNewStudentCoordinator({
                      ...newStudentCoordinator,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Department</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newStudentCoordinator.department}
                  readOnly // Prevent department from being changed manually
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Year</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newStudentCoordinator.year}
                  onChange={(e) =>
                    setNewStudentCoordinator({
                      ...newStudentCoordinator,
                      year: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleAddCoordinator}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Coordinator"}
              </button>
            </div>

            {/* List Student Coordinators */}
            <h3 className="text-xl font-semibold mb-4">Student Coordinators List</h3>
            <table className="table-auto w-full text-left bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentCoordinators.length > 0 ? (
                  studentCoordinators.map((coordinator, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-4 py-2">{coordinator.name}</td>
                      <td className="px-4 py-2">{coordinator.email}</td>
                      <td className="px-4 py-2">{coordinator.department}</td>
                      <td className="px-4 py-2">{coordinator.year}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          onClick={() =>
                            handleRemoveCoordinator(coordinator.email)
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No coordinators found for the given criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>
      {/* <CompanyCard /> */}
    </>
  );
};

export default FacultyDashboard;
