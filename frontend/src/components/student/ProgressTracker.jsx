import React, { useState } from 'react';
import '../../ProgressTracker.css';

function ProgressTracker() {
    const companies = [
        { name: 'Company A', stages: ['Applied', 'Drive Going', 'Drive Completed', 'Result'], currentStage: 0 },
        { name: 'Company B', stages: ['Applied', 'Drive Going', 'Drive Completed', 'Result'], currentStage: 0 },
        { name: 'Company C', stages: ['Applied', 'Drive Going', 'Drive Completed', 'Result'], currentStage: 0 },
    ];
    const [companyProgress, setCompanyProgress] = useState(companies);

    const handleNextStage = (index) => {
        setCompanyProgress(prevState => 
            prevState.map((company, i) => 
                i === index && company.currentStage < company.stages.length - 1
                    ? { ...company, currentStage: company.currentStage + 1 }
                    : company
            )
        );
    };

    const handlePrevStage = (index) => {
        setCompanyProgress(prevState => 
            prevState.map((company, i) => 
                i === index && company.currentStage > 0
                    ? { ...company, currentStage: company.currentStage - 1 }
                    : company
            )
        );
    };

    return (
        <div className="progress-tracker-container">
            {companyProgress.map((company, index) => (
                <div key={index} className="progress-tracker glassmorphism ">
                    <h2 className="company-name text-black text-2xl mb-5">{company.name}</h2>
                    <div className="tracker gap-10">
                        {company.stages.map((stage, stageIndex) => (
                            <div key={stageIndex} className={`tracker-stage ${stageIndex <= company.currentStage ? 'active' : ''}`}>
                                <div className="circle">{stageIndex + 1}</div>
                                <div className="label">{stage}</div>
                            </div>
                        ))}
                    </div>
                    <div className="buttons">
                        <button onClick={() => handlePrevStage(index)} disabled={company.currentStage === 0}>Previous</button>
                        <button onClick={() => handleNextStage(index)} disabled={company.currentStage === company.stages.length - 1}>Next</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProgressTracker;
