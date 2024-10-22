import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import the Link component
import AuthLayout from "./AuthLayout"; // Import the shared layout

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            }, { withCredentials: true }); // Ensure credentials are included in request
    
            console.log(res.data);
            navigate('/cdashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Something went wrong');
        }
    };

  return (
    <AuthLayout>
      <div className="glassmorphism p-8 shadow-lg rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
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
            className="w-full glassmorphism px-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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