import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ProgressTracker.css';

function ProgressTracker() {
    const [companyProgress, setCompanyProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch student progress when the component mounts
        const fetchStudentProgress = async () => {
            try {
                // Add withCredentials: true to include the cookie in the request
                const response = await axios.get('http://localhost:5000/api/students/student-progress', {
                    withCredentials: true, // Ensure cookies are sent
                    headers: {
                        'Content-Type': 'application/json', // Content type
                    },
                });
                setCompanyProgress(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student progress:', error);
                setLoading(false);
            }
        };

        fetchStudentProgress();
    }, []); // Empty dependency array means it runs only once when the component mounts

    return (
        <div className="progress-tracker-container mt-28">
            <h2 className="text-4xl text-center text-black font-bold mb-10">Companies Activities</h2>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                companyProgress.map((company, index) => (
                    <div key={index} className="progress-tracker bg-indigo-200 p-4 md:mx-32 m-4 rounded-lg shadow-md">
                        <h2 className="company-name text-black text-2xl mb-5">{company.companyName}</h2>
                        <div className="tracker gap-24">
                            {company.stages.map((stage, stageIndex) => (
                                <div
                                    key={stageIndex}
                                    className={`tracker-stage ${stage.cleared ? 'green' : ''}`}
                                >
                                    <div className="circle"></div>
                                    <div className="label">{stage.roundName}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProgressTracker;
