import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from "./AuthLayout"; // Import your AuthLayout if necessary
import './style.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(true); // Toggle for admin or faculty login
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Define your login URLs for admin and faculty
    const url = isAdminLogin ? 'http://localhost:5000/admin/login' : 'http://localhost:5000/fc/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('department', data.coordinator.department);
        navigate(isAdminLogin ? '/admin/dashboard' : '/faculty-dashboard'); // Redirect based on login type
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
        <h2 className="text-2xl font-semibold mb-6 text-center">{isAdminLogin ? 'Admin Login' : 'Faculty Login'}</h2>
        <form onSubmit={handleSubmit} className="p-2 space-y-4">
          {errorMessage && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full glassmorphism px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full glassmorphism px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`w-full bg-neutral-950 text-white py-2 rounded-lg transform hover:scale-95 transition duration-300 ease-in-out mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : (isAdminLogin ? 'Admin Login' : 'Login')}
          </button>
        </form>
        <div className="w-full flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="text-indigo-500 hover:underline"
          >
            {isAdminLogin ? "Switch to Faculty Login" : "Switch to Admin Login"}
          </button>
          <Link to="/admin/forgot-password" className="mt-4 text-indigo-500 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
