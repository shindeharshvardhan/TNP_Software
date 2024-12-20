import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function SetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');

    const handleSetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/authr/register', { email, password });
            alert(res.data.msg);
            if (res.data.msg === "User already exists. Please login.") {
                navigate('/login');
            } else {
                navigate('/');
            }
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Set Password</h2>
            <form onSubmit={handleSetPassword}>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Set Password</button>
            </form>
        </div>
    );
}

export default SetPassword;
