import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {});
            alert('Logged out successfully');
            navigate('/login');
        } catch (err) {
            alert('Failed to log out');
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
