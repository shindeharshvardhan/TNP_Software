import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../Notification.css';

function StudentNotification({ companies, onAccept, onReject }) {
    const [responses, setResponses] = useState({});

    useEffect(() => {
        // Check initial responses for each company from backend or cookies if needed
        const studentPrn = Cookies.get("studentPrn");
        if (studentPrn) {
            companies.forEach((company) => {
                // Here you would call an API or logic to check if the student has already accepted or rejected a company
                // For example, if responses are stored in cookies or localStorage
                const acceptedCompanies = Cookies.get("acceptedCompanies")?.split(",") || [];
                const rejectedCompanies = Cookies.get("rejectedCompanies")?.split(",") || [];

                if (acceptedCompanies.includes(company._id)) {
                    setResponses((prev) => ({ ...prev, [company._id]: 'accepted' }));
                } else if (rejectedCompanies.includes(company._id)) {
                    setResponses((prev) => ({ ...prev, [company._id]: 'rejected' }));
                }
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
                .then(response => {
                    console.log("Response from backend:", response.data);

                    // Store accepted company in cookies
                    const acceptedCompanies = Cookies.get("acceptedCompanies")?.split(",") || [];
                    acceptedCompanies.push(company._id);
                    Cookies.set("acceptedCompanies", acceptedCompanies.join(","));

                    onAccept(company._id);
                })
                .catch(error => {
                    console.error("Error accepting company:", error);
                });
        }
    };

    const handleReject = (company) => {
        console.log(`Rejected company with ID: ${company._id}`);

        setResponses((prev) => ({ ...prev, [company._id]: 'rejected' }));

        const studentPrn = Cookies.get("studentPrn");
        if (studentPrn) {
            axios.post("http://localhost:5000/api/students/reject-company", {
                studentPrn: studentPrn,
                companyId: company._id,
            })
                .then(response => {
                    console.log("Response from backend:", response.data);

                    // Store rejected company in cookies
                    const rejectedCompanies = Cookies.get("rejectedCompanies")?.split(",") || [];
                    rejectedCompanies.push(company._id);
                    Cookies.set("rejectedCompanies", rejectedCompanies.join(","));

                    onReject(company._id);
                })
                .catch(error => {
                    console.error("Error rejecting company:", error);
                });
        }
    };

    return (
        <div>
            {companies.map((company) => {
                console.log('Company Data:', company);

                const visit = company.visits[1]; // Second visit object

                return (
                    <div
                        key={company._id}
                        className="notification-container bg-indigo-200 p-4 mb-4 rounded-lg shadow-md"
                    >
                        <h2 className="font-semibold mb-2 text-xl text-black">Placement Opportunity!</h2>
                        <p><strong>Company Name:</strong> {company.name}</p>
                        <p><strong>Application Deadline:</strong> {company.applicationDeadline}</p>

                        {visit ? (
                            <>
                                <p><strong>Job Role:</strong> {visit.jobRole}</p>
                                <p><strong>CTC:</strong> {visit.ctc}</p>
                                <p><strong>Bond:</strong> {visit.jobRole}</p>
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
                                className={`my-4 font-semibold ${responses[company._id] === 'accepted' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                You have {responses[company._id]} this placement drive.
                            </p>
                        ) : (
                            <div className="button-container mt-4">
                                <button
                                    className="accept-button mr-2"
                                    onClick={() => handleAccept(company)}
                                    disabled={responses[company._id] === 'accepted' || responses[company._id] === 'rejected'}
                                >
                                    Accept
                                </button>
                                <button
                                    className="reject-button"
                                    onClick={() => handleReject(company)}
                                    disabled={responses[company._id] === 'accepted' || responses[company._id] === 'rejected'}
                                >
                                    Reject
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
