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
            alert(res.data.msg);
            navigate(`/set-password?email=${email}`);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Register - Email Check</h2>
            <form onSubmit={handleEmailCheck}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default Register;
