import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../Contexts/StudentAuthContext';
import AuthLayout from './AuthLayout';
import { Link } from 'react-router-dom';

function StudentLogin() {
  const { login, isStudentAuthenticated, loading } = useContext(AuthContext); // Use login function from context
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  if (isStudentAuthenticated) {
    navigate("/student_dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prn, password }),
        credentials: 'include', // This allows cookies to be included
      });

      console.log("Response headers:", response.headers); // Debug response headers

      const data = await response.json();
      if (response.ok) {
        console.log("Cookies after login:", document.cookie); // Check if cookies are set
        setSuccessMessage('Login successful');
        setErrorMessage('');
        login(prn); // Set login state in context
        navigate("/student_dashboard");
      } else {
        setErrorMessage(data.message || "Login failed. Please check your credentials.");
        setSuccessMessage('');
        setPrn('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Server error. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <AuthLayout>
      <div className="container w-full h-full md:px-20 mt-24">
        <div className="glassmorphism rounded-2xl p-10 mx-auto mt-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-neutral-950 p-3">Login</h1>

          <form onSubmit={handleSubmit}>
            <label className="form-control bg-transparent border-0 my-2">
              <div className="label">
                <span className="label-text text-xl">Permanent Registration Number (PRN):</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="PRN"
                  className="glassmorphism input input-info student-form-input-style"
                  value={prn}
                  onChange={(e) => setPrn(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="form-control bg-transparent border-0 my-2">
              <div className="label">
                <span className="label-text text-xl">Password:</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="glassmorphism input input-info student-form-input-style"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <div className="text-center py-3">
              <button className="btn bg-neutral-950 text-white btn-info w-full rounded p-2" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="text-neutral-950">
              Don't have an account?{' '}
              <Link to="/student_registration" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default StudentLogin;
