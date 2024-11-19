import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout'; // Assuming you have a shared layout for auth pages
import './style.css';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    try {
      const response = await fetch('http://localhost:5000/fc/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      setLoading(false);
  
      if (response.ok) {
        // Store the coordinator data in the cookie (in JSON format)
        const coordinatorData = JSON.stringify({
          email: data.coordinator.email,
          department: data.coordinator.department,
          year: data.coordinator.year
        });
    
        // Set the cookie with coordinator data (1 day expiration time)
        document.cookie = `FcoordinatorData=${coordinatorData}; path=/; max-age=86400;`; 
    
        // Optionally store the department in localStorage
        localStorage.setItem('department', data.coordinator.department);
  
        navigate('/faculty-dashboard');
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Please try again later.');
      setLoading(false);
    }
  };
  

  return (
    <AuthLayout>
      <div className="glassmorphism p-8 shadow-lg rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Faculty Login</h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-2 space-y-4">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full glassmorphism px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full glassmorphism px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-neutral-950 text-white py-2 rounded-lg transform hover:scale-95 transition duration-300 ease-in-out mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="w-full flex items-center justify-between mt-4">
          <Link to="/admin/login" className="text-indigo-500 hover:underline">
            Switch to Admin Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default FacultyLogin;
