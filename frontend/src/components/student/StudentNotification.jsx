import React, { useState } from 'react';
import '../../Notification.css';

function StudentNotification({ companies, onAccept, onReject }) {
    const [responses, setResponses] = useState({});

    const handleAccept = (companyId) => {
        setResponses((prev) => ({ ...prev, [companyId]: 'accepted' }));
        onAccept(companyId);
    };

    const handleReject = (companyId) => {
        setResponses((prev) => ({ ...prev, [companyId]: 'rejected' }));
        onReject(companyId);
    };

    return (
        <div>
            {companies.map((company) => (
                <div key={company.id} className="notification-container bg-indigo-200 p-4 mb-4 rounded-lg shadow-md">
                    <h2 className="font-semibold mb-2 text-xl text-black">Placement Opportunity!</h2>
                    <p><strong>Company Name:</strong> {company.name}</p>
                    <p><strong>Program:</strong> {company.program}</p>
                    <p><strong>Eligibility:</strong> {company.eligibilityCriteria}</p>
                    <p><strong>Job Role:</strong> {company.jobRole}</p>
                    <p><strong>Application Deadline:</strong> {company.applicationDeadline}</p>
                    <p><strong>CTC:</strong> {company.ctc}</p>
                    <p><strong>Bond:</strong> {company.bond}</p>
                    <p><strong>Location:</strong> {company.location}</p>
                    <p><strong>Internship Offered:</strong> {company.isInternshipOffered}</p>
                    <p><strong>Training Offered:</strong> {company.isTrainingOffered}</p>
                    <p><strong>Other Details:</strong> {company.otherDetails}</p>

                    {responses[company.id] ? (
                        <p
                            className={`my-4 font-semibold ${responses[company.id] === 'accepted' ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            You have {responses[company.id]} this placement drive.
                        </p>
                    ) : (
                        <div className="button-container mt-4">
                            <button className="accept-button mr-2" onClick={() => handleAccept(company.id)}>Accept</button>
                            <button className="reject-button" onClick={() => handleReject(company.id)}>Reject</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default StudentNotification;
