import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../Contexts/Studentcoordinatorauth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setStudentCoordinatorId, setIsAuthenticated } = useAuth();

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 86400e3).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data)
        setStudentCoordinatorId(data.user.id);
        setIsAuthenticated(true);

        // Set only the necessary cookies and remove duplicates if needed
        setCookie('studentCoordinatorId', data.user.id, 1); // 1-day expiry
        setCookie('isAuthenticated', true, 1);

        navigate('/cdashboard');
      } else {
        setError(data.msg || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="glassmorphism p-8 shadow-lg rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
