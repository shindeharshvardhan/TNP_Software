import React, { useState, useEffect } from 'react';
import './style.css';  // Custom CSS for additional styling
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [newCoordinators, setNewCoordinators] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing coordinator data
  useEffect(() => {
    fetch('http://localhost:8080/fc')
      .then(res => res.json())
      .then(data => setCoordinators(data))
      .catch(error => console.error('Error fetching coordinators:', error));
  }, []);

  // Add a new coordinator for the next year (+1 year)
  const handleAddNewYear = () => {
    if (coordinators.length === 0) {
      alert('No coordinator data available.');
      return;
    }

    const lastYear = Math.max(...coordinators.map(c => c.year));
    const nextYear = lastYear + 1;

    // Pre-fill coordinator data from the last year for the new year (+1)
    const lastYearData = coordinators.filter(c => c.year === lastYear);
    const prefilledCoordinators = lastYearData.map(coordinator => ({
      ...coordinator,
      year: nextYear,
    }));

    setNewCoordinators(prefilledCoordinators);
    setSelectedYear(nextYear);
  };

  const handleSubmitNewYear = () => {
    setLoading(true);
    fetch('http://localhost:8080/fc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year: selectedYear, coordinators: newCoordinators }),
    })
      .then(res => res.json())
      .then(() => {
        alert('Coordinators added successfully');
        setLoading(false);
        setSelectedYear(null);
        setNewCoordinators([]);
      })
      .catch(error => {
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

  return (
    <div className="admin-dashboard w-full">
      {/* Navbar */}
      {/* <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <div className="text-lg font-bold">Admin Dashboard</div>
        <div>
          <a className="px-4 py-2 hover:bg-gray-700 rounded" href="#">Home</a>
          <a className="px-4 py-2 hover:bg-gray-700 rounded" href="#">Settings</a>
          <a className="px-4 py-2 hover:bg-gray-700 rounded" href="#">Logout</a>
        </div>
      </nav> */}
      <Navbar/>

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        {/* <nav className="bg-gray-100 w-1/6 min-h-screen p-4">
          <ul className="space-y-4">
            <li><a className="text-indigo-500 font-semibold" href="#">Dashboard</a></li>
            <li><a className="hover:text-indigo-500" href="#">Coordinators</a></li>
            <li><a className="hover:text-indigo-500" href="#">Reports</a></li>
          </ul>
        </nav> */}

        {/* Main Content */}
        <main className="w-full h-full p-8">
          <div className="border-b-2 pb-4 mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          {/* List past years with coordinator details in a table */}
          <h3 className="text-xl font-semibold mb-4">Past Years</h3>
          {Object.keys(groupedByYear).map((year) => (
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
          ))}

          {/* Add new year */}
          <div className="card bg-white shadow-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add Coordinators for Year {Math.max(...coordinators.map(c => c.year)) + 1}</h3>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={handleAddNewYear}>Add Coordinators for Next Year</button>
          </div>

          {/* Display editable coordinator fields if a new year is selected */}
          {selectedYear && (
            <div className="card bg-white shadow-lg p-4">
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
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
