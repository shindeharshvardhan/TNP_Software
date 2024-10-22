import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      const response = await fetch('http://localhost:8080/fc/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
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
    <div className="container mx-auto mt-20">
      <h2 className="text-center mb-8 text-2xl font-semibold">Faculty Login</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {errorMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
