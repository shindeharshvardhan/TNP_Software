import React from 'react'
import StudentNotification from './StudentNotification' 

function StudentNotificationPage() {
    const companies = [
        {
          id: 1,
          name: 'Tech Innovations Ltd.',
          eligibilityCriteria: 'Minimum CGPA 7.0',
          description: 'Tech Innovations Ltd. is a leading tech company specializing in AI and IoT solutions. Global Solutions Inc. is known for its consultancy services in the finance and healthcare sectors. Global Solutions Inc. is known for its consultancy services in the finance and healthcare sectors.',
        },
        {
          id: 2,
          name: 'Global Solutions Inc.',
          eligibilityCriteria: 'CGPA above 6.5',
          description: 'Global Solutions Inc. is known for its consultancy services in the finance and healthcare sectors. Global Solutions Inc. is known for its consultancy services in the finance and healthcare sectors. ',
        },
        {
          id: 3,
          name: 'FinTech Corp.',
          eligibilityCriteria: 'All branches with CGPA 8.0 and above',
          description: 'FinTech Corp. focuses on financial technology solutions, including blockchain and cybersecurity.',
        },
      ];
      
    
      const handleAccept = (companyId) => {
        console.log(`Accepted company with ID: ${companyId}`);
      };
    
      const handleReject = (companyId) => {
        console.log(`Rejected company with ID: ${companyId}`);
      };
    
      return (
        <div className='mt-32'>
          <h1 className='text-2xl font-semibold text-center mb-6'>Training and Placement Notifications</h1>
          <StudentNotification
            companies={companies}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      )
}

export default StudentNotificationPage
