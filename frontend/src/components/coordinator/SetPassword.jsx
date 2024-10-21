import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "./AuthLayout";

function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(null); // Track if passwords match
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the email from URL query params
  const email = new URLSearchParams(location.search).get("email");

  // Define the password strength validation function
  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) errors.push("Must be at least 8 characters");
    if (!/[A-Z]/.test(password))
      errors.push("Must contain at least one uppercase letter");
    if (!/[a-z]/.test(password))
      errors.push("Must contain at least one lowercase letter");
    if (!/\d/.test(password)) errors.push("Must contain at least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("Must contain at least one special character");

    return errors;
  };

  // Handle password input and validation
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const errors = validatePassword(newPassword);
    setValidationErrors(errors);

    // Provide a password strength rating based on the number of criteria met
    if (errors.length === 0) {
      setPasswordStrength("Strong");
    } else if (errors.length <= 2) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  // Handle confirm password input and match check
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Set password match status
    setPasswordMatch(newConfirmPassword === password);
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if email is present
    if (!email) {
      alert("Email is missing");
      return;
    }

    // Check if password meets all validation criteria
    const errors = validatePassword(password);
    if (errors.length > 0) {
      alert("Please fix the password errors.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      alert(res.data.msg);
      navigate("/");
    } catch (err) {
      console.error(err); // Log error details for debugging
      alert(err.response?.data?.msg || "Error setting password");
    }
  };

  return (
    <AuthLayout>
      <div className="glassmorphism w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Set Password</h2>
        <form onSubmit={handleSetPassword} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full p-2 glassmorphism-2 rounded-md focus:outline-none focus:ring-none border-0 border-b-4 ${
                passwordStrength === "Weak"
                  ? "border-b-red-500"
                  : passwordStrength === "Medium"
                  ? "border-b-yellow-500"
                  : "border-b-green-500"
              }`}
              required
            />

            <div className="mt-2 text-sm flex items-center">
              <span>Password Strength: </span>
              <span
                className={`ml-2 font-semibold ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {passwordStrength}
              </span>
            </div>
          </div>

          <ul className="list-disc ml-5 text-neutral-950 text-sm">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-2 border rounded-md glassmorphism focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="text-sm">
              {confirmPassword && (
                <span
                  className={`font-semibold ${
                    passwordMatch ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {passwordMatch ? "Passwords match" : "Passwords do not match"}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-950 text-white py-2 rounded-lg transform hover:scale-95 transition duration-300 ease-in-out mt-2"
          >
            Set Password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SetPassword;
