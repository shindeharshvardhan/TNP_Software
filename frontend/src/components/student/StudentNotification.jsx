import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../Notification.css';  // Ensure this file includes the styles

function StudentNotification({ companies, onAccept }) {
    const [responses, setResponses] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date()); // Current date for deadline comparison

    useEffect(() => {
        const studentPrn = Cookies.get("studentPrn");
        if (studentPrn) {
            axios.get(`http://localhost:5000/api/students/${studentPrn}/responses`)
                .then((response) => {
                    const { acceptedCompanies } = response.data;
                    const updatedResponses = {};

                    companies.forEach((company) => {
                        if (acceptedCompanies.includes(company._id)) {
                            updatedResponses[company._id] = 'accepted';
                        }
                    });

                    setResponses(updatedResponses);
                })
                .catch((error) => {
                    console.error("Error fetching student responses:", error);
                });
        }
    }, [companies]);

    const handleAccept = (company) => {
        console.log(`Accepted company with ID: ${company._id}`);

        setResponses((prev) => ({ ...prev, [company._id]: 'accepted' }));

        const studentPrn = Cookies.get("studentPrn");
        if (studentPrn) {
            axios.post("http://localhost:5000/api/students/accept-company", {
                studentPrn: studentPrn,
                companyId: company._id,
            })
                .then((response) => {
                    console.log("Response from backend:", response.data);
                    onAccept(company._id);
                })
                .catch((error) => {
                    console.error("Error accepting company:", error);
                });
        }
    };

    return (
        <div>
            {companies.map((company) => {
                console.log('Company Data:', company);

                const visit = company.visits[company.visits.length - 1]; // Last visit object
                const isDeadlinePassed = new Date(visit.deadline) < currentDate;

                return (
                    <div
                        key={company._id}
                        className="notification-container bg-indigo-200 p-4 mb-4 rounded-lg shadow-md"
                    >
                        <h2 className="font-semibold mb-2 text-xl text-black">Placement Opportunity!</h2>
                        <p><strong>Company Name:</strong> {company.name}</p>
                        
                        {visit ? (
                            <>
                                <p><strong>Job Role:</strong> {visit.jobRole}</p>
                                <p><strong>Application Deadline:</strong> {visit.deadline}</p>
                                <p><strong>CTC:</strong> {visit.ctc}</p>
                                <p><strong>Bond:</strong> {visit.bond}</p>
                                <p><strong>Location:</strong> {visit.location}</p>
                                <p><strong>Internship Offered:</strong> {visit.isInternshipOffered ? "Yes" : "No"}</p>
                                <p><strong>Internship Stipend:</strong> {visit.internshipStipend}</p>
                                <p><strong>10th Eligibility:</strong> {visit.tenthEligibility}</p>
                                <p><strong>12th Eligibility:</strong> {visit.twelfthEligibility}</p>
                                <p><strong>BE Aggregate:</strong> {visit.beAggregate}</p>
                                <p><strong>Other Details:</strong> {visit.extraDetails}</p>
                            </>
                        ) : (
                            <p>No visit data available for this company</p>
                        )}

                        {responses[company._id] ? (
                            <p
                                className={`my-4 font-semibold ${
                                    responses[company._id] === 'accepted' ? 'text-green-600' : ''
                                }`}
                            >
                                You have {responses[company._id]} this placement drive.
                            </p>
                        ) : (
                            <div className="button-container mt-4">
                                <button
                                    className={`accept-button mr-2 ${isDeadlinePassed ? 'disabled' : ''}`}
                                    onClick={() => handleAccept(company)}
                                    disabled={isDeadlinePassed}
                                >
                                    Accept
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default StudentNotification;
