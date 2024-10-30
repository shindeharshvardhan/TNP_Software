import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NavbarFaculty from "./NavbarFaculty";

const AssignCoordinator = () => {
  const [companies, setCompanies] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoordinators, setSelectedCoordinators] = useState({});
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    faculty: "",
  });
  const currentYear = 2024;

  const fetchData = () => {
    fetch(`http://localhost:5000/cc/companies/dept/CSE`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCompanies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setLoading(false);
      });

    fetch(`http://localhost:5000/sc?department=CSE&year=${currentYear}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCoordinators(data);
      })
      .catch((error) => console.error("Error fetching coordinators:", error));
  };

  useEffect(() => {
    fetchData();
  }, [currentYear]);

  const handleCoordinatorChange = (companyId, coordinatorId) => {
    setSelectedCoordinators((prevState) => ({
      ...prevState,
      [companyId]: coordinatorId,
    }));
  };

  const handleAssignCoordinator = (companyId) => {
    const coordinatorId = selectedCoordinators[companyId];

    if (!coordinatorId) {
      alert("Please select a coordinator to assign!");
      return;
    }

    fetch(`http://localhost:5000/cc/companies/${companyId}/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinatorId: coordinatorId,
        year: currentYear,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to assign coordinator");
        }
        return response.json();
      })
      .then(() => {
        alert("Coordinator assigned successfully!");
        fetchData();
      })
      .catch((error) => {
        console.error("Error assigning coordinator:", error);
      });
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();

    if (!newCompany.name || !newCompany.faculty) {
      alert("Please fill in both the company name and faculty!");
      return;
    }

    fetch(`http://localhost:5000/cc/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add company");
        }
        return response.json();
      })
      .then((data) => {
        alert("Company added successfully!");
        setCompanies((prevCompanies) => [...prevCompanies, data]);
        setNewCompany({ name: "", faculty: "" });
        setShowAddCompanyForm(false);
      })
      .catch((error) => {
        console.error("Error adding company:", error);
      });
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <NavbarFaculty />
      <div className="w-full h-full p-8 mt-4">
        <h2 className="text-xl text-neutral-950 font-semibold mb-4">
          Assign Coordinators to Companies
        </h2>

        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowAddCompanyForm((prevShow) => !prevShow)}
        >
          {showAddCompanyForm ? "Hide Add Company" : "Add Company"}
        </button>

        {showAddCompanyForm && (
          <div className="mt-3">
            <h3 className="text-lg font-medium mb-2">Add New Company</h3>
            <form onSubmit={handleAddCompany}>
              <div className="mb-3">
                <label
                  htmlFor="companyName"
                  className="block text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full"
                  id="companyName"
                  name="name"
                  value={newCompany.name}
                  onChange={handleNewCompanyChange}
                  placeholder="Enter company name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="faculty" className="block text-gray-700 mb-1">
                  Faculty
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full"
                  id="faculty"
                  name="faculty"
                  value={newCompany.faculty}
                  onChange={handleNewCompanyChange}
                  placeholder="Enter faculty"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        <table className="min-w-full table-auto mt-5">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Faculty</th>
              <th className="px-4 py-2">Assigned Coordinator</th>
              <th className="px-4 py-2">Coordinator Email</th>
              <th className="px-4 py-2">Available Coordinators</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.length > 0 ? (
              companies.map((company) => {
                const currentVisit = company.visits.find(
                  (visit) => visit.year === currentYear
                );
                const assignedCoordinatorName = currentVisit
                  ? currentVisit.coordinatedBy
                  : null;
                const assignedCoordinatorEmail = currentVisit
                  ? currentVisit.coordinatorEmail
                  : null;

                return (
                  <tr key={company.id} className="bg-white border-b">
                    <td className="px-4 py-2">{company.name}</td>
                    <td className="px-4 py-2">{company.faculty}</td>
                    <td className="px-4 py-2">
                      {assignedCoordinatorName ? (
                        <span>{assignedCoordinatorName}</span>
                      ) : (
                        <span>Not Assigned</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {assignedCoordinatorEmail ? (
                        <span>{assignedCoordinatorEmail}</span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!assignedCoordinatorName && (
                        <select
                          className="border border-gray-300 bg-slate-100 text-neutral-950 p-2 rounded w-full"
                          onChange={(e) =>
                            handleCoordinatorChange(company.id, e.target.value)
                          }
                        >
                          <option value="">Select a Coordinator</option>
                          {coordinators.map((coordinator) => (
                            <option
                              key={coordinator._id}
                              value={coordinator._id}
                            >
                              {coordinator.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        onClick={() => handleAssignCoordinator(company.id)}
                        disabled={!!assignedCoordinatorName}
                      >
                        Assign Coordinator
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No companies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignCoordinator;
