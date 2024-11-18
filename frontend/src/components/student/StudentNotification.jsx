import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../../Notification.css';

function StudentNotification({ companies, fetchStudentDetails, onSubmitForm, onAccept, onReject }) {
    const [responses, setResponses] = useState({});
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [formFiles, setFormFiles] = useState({ resume: null, resultFiles: {} });

    const handleAccept = (company) => {
        setResponses((prev) => ({ ...prev, [company.id]: 'accepted' }));
        setSelectedCompany(company);

        // Fetch student details from backend
        const prn = Cookies.get('prn');
        if (prn) {
            fetchStudentDetails(prn)
                .then((data) => setStudentData(data))
                .catch((error) => console.error('Error fetching student details:', error));
        }

        onAccept(company.id);
    };

    const handleReject = (companyId) => {
        setResponses((prev) => ({ ...prev, [companyId]: 'rejected' }));
        setSelectedCompany(null);
        setStudentData(null);
        onReject(companyId);
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (fileType === 'resume') {
            setFormFiles((prev) => ({ ...prev, resume: file }));
        } else {
            setFormFiles((prev) => ({
                ...prev,
                resultFiles: { ...prev.resultFiles, [fileType]: file },
            }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('resume', formFiles.resume);
        Object.keys(formFiles.resultFiles).forEach((key) => {
            formData.append(key, formFiles.resultFiles[key]);
        });

        onSubmitForm(selectedCompany.id, studentData, formData)
            .then(() => {
                alert('Form submitted successfully!');
                setSelectedCompany(null); // Close the form after submission
                setStudentData(null);
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div>
            {companies.map((company) => (
                <div
                    key={company.id}
                    className="notification-container bg-indigo-200 p-4 mb-4 rounded-lg shadow-md"
                >
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
                        <>
                            <p
                                className={`my-4 font-semibold ${
                                    responses[company.id] === 'accepted' ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                You have {responses[company.id]} this placement drive.
                            </p>

                            {responses[company.id] === 'accepted' && selectedCompany?.id === company.id && studentData && (
                                <form
                                    className="form-container bg-white p-6 rounded-lg shadow-md"
                                    onSubmit={handleFormSubmit}
                                >
                                    <h3 className="font-semibold mb-4 text-lg">Application Form</h3>
                                    <p><strong>Student Name:</strong> {studentData.firstName} {studentData.lastName}</p>
                                    <p><strong>10th Percentage:</strong> {studentData.tenthPercentage}%</p>
                                    <p><strong>12th/Diploma Percentage:</strong> {studentData.twelfthPercentage || studentData.diplomaPercentage}%</p>
                                    {/* Add more data like UG/PG percentages */}

                                    <div className="file-inputs mt-4">
                                        <label className="block mb-2">
                                            Upload Resume:
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleFileChange(e, 'resume')}
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Upload 10th Result:
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleFileChange(e, 'tenthResult')}
                                            />
                                        </label>
                                        <label className="block mb-2">
                                            Upload 12th/Diploma Result:
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleFileChange(e, 'twelfthDiplomaResult')}
                                            />
                                        </label>
                                        {/* Add more file inputs for UG/PG results */}
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-button mt-4 bg-indigo-600 text-white p-2 rounded"
                                    >
                                        Submit
                                    </button>
                                </form>
                            )}
                        </>
                    ) : (
                        <div className="button-container mt-4">
                            <button
                                className="accept-button mr-2"
                                onClick={() => handleAccept(company)}
                            >
                                Accept
                            </button>
                            <button
                                className="reject-button"
                                onClick={() => handleReject(company.id)}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default StudentNotification;
