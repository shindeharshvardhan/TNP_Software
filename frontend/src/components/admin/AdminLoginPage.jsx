import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import the necessary components
import AuthLayout from "./AuthLayout"; // Assuming you have a shared layout for auth pages

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Navigate to a different page after login

  const handleAdminLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded username and password
    const hardcodedUsername = "keya";
    const hardcodedPassword = "keya"; // Both username and password are "keya"

    // Check if the username and password match the hardcoded values
    if (username === hardcodedUsername && password === hardcodedPassword) {
      console.log("Login successful");
      navigate("/admin/dashboard"); // Redirect to admin dashboard on successful login
    } else {
      alert("Incorrect username or password");
    }
  };

  return (
    <AuthLayout>
      <div className="glassmorphism p-8 shadow-lg rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleAdminLogin} className="p-2 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            <Link to="/admin/forgot-password" className="mt-4 text-indigo-500 hover:underline">
              Forgot password?
            </Link>
            <Link to="/faculty/login" className="mt-4 text-indigo-500 hover:underline">
              Switch to Faculty Login
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-950 text-white py-2 rounded-lg transform hover:scale-95 transition duration-300 ease-in-out mt-2"
          >
            Admin Login
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
