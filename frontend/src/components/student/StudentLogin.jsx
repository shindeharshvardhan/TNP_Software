import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthLayout from './AuthLayout';

function StudentLogin({ setStudentAuthStatus }) {
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Function to set cookies
  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 86400e3).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prn, password }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Login successful');
        setErrorMessage('');
        setStudentAuthStatus(true);
        console.log(data)
        // Set cookies upon successful login
        setCookie('studentPrn', prn, 1); // Store PRN for 1 day
        setCookie('isAuthenticated', true, 1); // Store auth status for 1 day

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
      <div className="container w-full h-full md:px-20">
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
              <button className="btn bg-neutral-950 text-white btn-info">Login</button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

StudentLogin.propTypes = {
  setStudentAuthStatus: PropTypes.func.isRequired,
};

export default StudentLogin;
