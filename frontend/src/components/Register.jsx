import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailCheck = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/check-email', { email });
            
            // Check if the user is already registered
            alert(res.data.msg);

            // If email is valid and not yet registered, move to the set password page
            if (res.status === 200) {
                navigate(`/set-password?email=${encodeURIComponent(email)}`);
            }
        } catch (err) {
            // If user is already registered, show message and redirect to login
            alert(err.response.data.msg);
            if (err.response.data.msg === 'User already registered. Please login.') {
                navigate('/');
            }
        }
    };

    return (
        <div>
            <h2>Register - Email Check</h2>
            <form onSubmit={handleEmailCheck}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default Register;
