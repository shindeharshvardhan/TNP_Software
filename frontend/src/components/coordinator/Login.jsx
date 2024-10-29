import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import AuthLayout from "./AuthLayout"; // Import the shared layout
import { useAuth } from "../Contexts/Studentcoordinatorauth"; // Adjust the path based on your context location

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate(); // Define navigate using useNavigate
  const { setStudentCoordinatorId, setIsAuthenticated } = useAuth(); // Use context for auth management

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error messages
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        credentials: 'include', // Ensure credentials are included in the request
        body: JSON.stringify({ email, password }), // Convert the data to JSON
      });
  
      const data = await response.json(); // Parse the JSON response
      console.log(data);
  
      if (response.ok) { // Check if response is OK (status 200-299)
        console.log(data); // Log the response data
  
        // Store the student coordinator ID and authentication status in context
        setStudentCoordinatorId(data.user._id); 
        setIsAuthenticated(true); 
  
        // Set a cookie
        const expires = new Date(Date.now() + 86400e3).toUTCString(); // 1 day expiry
        document.cookie = `studentCoordinatorId=${data.user._id}; expires=${expires}; path=/; SameSite=None; Secure`;
  
        navigate('/cdashboard'); // Navigate to dashboard on successful login
      } else {
        setError(data.msg || 'Something went wrong'); // Display error message
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Something went wrong. Please try again.'); // Display generic error
    }
  };
  

  return (
    <AuthLayout>
      <div className="glassmorphism p-8 shadow-lg rounded-lg w-full bg-gradient-to-r from-indigo-100 to-white p-14">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message */}
        <form onSubmit={handleLogin} className="p-2 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full glassmorphism px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full glassmorphism px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-full flex items-center justify-between">
            <Link to="/forgot-password" className="mt-4 text-indigo-500 hover:underline">
              Forgot password?
            </Link>
            <Link to="/register" className="mt-4 text-indigo-500 hover:underline">
              Register
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-950 text-white py-2 rounded-lg transform hover:scale-95 transition duration-300 ease-in-out mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
