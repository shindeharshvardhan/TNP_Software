import React, { useState, useEffect } from 'react';
import './style.css'; 
// Custom CSS for additional styling
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [newCoordinators, setNewCoordinators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredYear, setFilteredYear] = useState(null); // State for filtering by selected year

  // Fetch existing coordinator data
  useEffect(() => {
    fetch('http://localhost:5000/fc')
      .then((res) => res.json())
      .then((data) => setCoordinators(data))
      .catch((error) => console.error('Error fetching coordinators:', error));
  }, []);

  // Add a new coordinator for the next year (+1 year)
  const handleAddNewYear = () => {
    if (coordinators.length === 0) {
      alert('No coordinator data available.');
      return;
    }

    const lastYear = Math.max(...coordinators.map((c) => c.year));
    const nextYear = lastYear + 1;

    // Pre-fill coordinator data from the last year for the new year (+1)
    const lastYearData = coordinators.filter((c) => c.year === lastYear);
    const prefilledCoordinators = lastYearData.map((coordinator) => ({
      ...coordinator,
      year: nextYear,
    }));

    setNewCoordinators(prefilledCoordinators);
    setSelectedYear(nextYear);
  };

  const handleSubmitNewYear = () => {
    setLoading(true);
    fetch('http://localhost:5000/fc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year: selectedYear, coordinators: newCoordinators }),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Coordinators added successfully');
        setLoading(false);
        setSelectedYear(null);
        setNewCoordinators([]);
      })
      .catch((error) => {
        console.error('Error adding coordinators:', error);
        setLoading(false);
      });
  };

  const handleCoordinatorChange = (index, field, value) => {
    const updatedCoordinators = [...newCoordinators];
    updatedCoordinators[index][field] = value;
    setNewCoordinators(updatedCoordinators);
  };

  // Group coordinators by year
  const groupedByYear = coordinators.reduce((acc, coordinator) => {
    if (!acc[coordinator.year]) {
      acc[coordinator.year] = [];
    }
    acc[coordinator.year].push(coordinator);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

  // Function to handle year filtering
  const handleFilterChange = (event) => {
    setFilteredYear(event.target.value);
  };

  return (
    <div className="admin-dashboard w-full">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Main Content */}
        <main className="w-full h-full p-8">
          {/* <div className="border-b-2 pb-4 mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div> */}

          {/* Add new year */}
          <div className="card bg-white shadow-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add Coordinators for Year {Math.max(...coordinators.map(c => c.year)) + 1}</h3>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={handleAddNewYear}>
              Add Coordinators for Next Year
            </button>
          </div>

          {/* Display editable coordinator fields if a new year is selected */}
          {selectedYear && (
            <div className="card bg-white shadow-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Edit Coordinators for {selectedYear}</h3>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {newCoordinators.map((coordinator, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="p-2">
                        <input
                          type="text"
                          className="border border-gray-300 p-1 rounded w-full"
                          value={coordinator.name}
                          onChange={(e) => handleCoordinatorChange(index, 'name', e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="email"
                          className="border border-gray-300 p-1 rounded w-full"
                          value={coordinator.email}
                          onChange={(e) => handleCoordinatorChange(index, 'email', e.target.value)}
                        />
                      </td>
                      <td className="p-2">{coordinator.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={handleSubmitNewYear} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit New Year'}
              </button>
            </div>
          )}

          {/* Year Selection Dropdown */}
          <div className="mb-4">
            <label className="mr-2">Filter by Year:</label>
            <select onChange={handleFilterChange} value={filteredYear || ''} className="border border-gray-300 p-2 rounded">
              <option value="">All Years</option>
              {sortedYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* List past years with coordinator details in a table */}
          <h3 className="text-xl font-semibold mb-4">Past Years</h3>
          {sortedYears.map((year) => (
            (!filteredYear || filteredYear === year) && ( // Conditionally render based on filtered year
              <div key={year} className="mb-6">
                <h4 className="text-lg font-medium mb-2">Year: {year}</h4>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Email</th>
                      <th className="border border-gray-300 p-2">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedByYear[year].map((coordinator, index) => (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="p-2">{coordinator.name}</td>
                        <td className="p-2">{coordinator.email}</td>
                        <td className="p-2">{coordinator.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ))}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
