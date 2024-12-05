// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//     const [email, setEmail] = useState('');
//     const navigate = useNavigate();

//     const handleEmailCheck = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/check-email', { email });

//             // Check if the user is already registered
//             alert(res.data.msg);

//             // If email is valid and not yet registered, move to the set password page
//             if (res.status === 200) {
//                 navigate(`/set-password?email=${encodeURIComponent(email)}`);
//             }
//         } catch (err) {
//             // If user is already registered, show message and redirect to login
//             alert(err.response.data.msg);
//             if (err.response.data.msg === 'User already registered. Please login.') {
//                 navigate('/');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Register - Email Check</h2>
//             <form onSubmit={handleEmailCheck}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Next</button>
//             </form>
//         </div>
//     );
// }

// export default Register;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import AuthLayout from "./AuthLayout";

function Register() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    console.log(email)
    try {
      const res = await axios.post(
        "http://localhost:5000/api/authr/check-email",
        { email }
      );

      // Check if the user is already registered
      alert(res.data.msg);

      // If email is valid and not yet registered, move to the set password page
      if (res.status === 200) {
        navigate(`/set-password?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      // If user is already registered, show message and redirect to login
      alert(err.response.data.msg);
      if (err.response.data.msg === "User already registered. Please login.") {
        navigate("/");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="glassmorphism p-8 shadow-lg rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleEmailCheck} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full glassmorphism px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold">Already a member?</p>
            <Link to="/" className="mt-1 text-indigo-500 hover:underline">
              Sign in
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-950 text-white py-2 rounded-lg transform hover:scale-95 transition duration-300 ease-in-out mt-2"
          >
            Next
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Register;
