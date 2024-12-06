import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import StudentNotification from './StudentNotification';

function StudentNotificationPage() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const prn = Cookies.get("studentPrn");

    useEffect(() => {
        const fetchEligibleCompanies = async () => {
            try {
                if (!prn) throw new Error("PRN not found in cookies");

                const response = await fetch(`http://localhost:5000/api/students/eligible-companies/${prn}`);
                if (!response.ok) throw new Error(`Failed to fetch eligible companies: ${response.statusText}`);

                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEligibleCompanies();
    }, [prn]);

    const handleAccept = (companyId) => {
        console.log(`Accepted company with ID: ${companyId}`);
    };

    if (loading) {
        return <div className='mt-32 text-center'>Loading Notifications...</div>;
    }

    if (error) {
        return <div className='mt-32 text-center text-red-500'>Error: {error}</div>;
    }

    return (
        <div className='mt-32'>
            <h1 className='text-2xl font-semibold text-center mb-6'>Training and Placement Notifications</h1>
            {companies.length > 0 ? (
                <StudentNotification
                    companies={companies}
                    onAccept={handleAccept}
                />
            ) : (
                <div className='text-center'>No notifications available</div>
            )}
        </div>
    );
}

export default StudentNotificationPage;