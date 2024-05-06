import React from 'react';
import './Stepper.css';

function StepperComponent({ currentStep, setCurrentStep }) {

    const steps = ["הגדרות הליך", "סיכום ושליחה"];

    const handleStepChange = (stepIndex) => {
        setCurrentStep(stepIndex);
    };

    return (
        <div className="stepper">
            {steps.map((step, index) => (
                <div key={index} className="steps" onClick={() => handleStepChange(index)}>
                    <div className='step'>
                        <div className={`circle ${index <= currentStep ? 'active' : ''}`}>
                            <div className={`dot ${index <= currentStep ? 'active' : ''}`}></div>
                        </div>
                        {index !== steps.length - 1 && <div className="line"></div>}
                    </div>
                    <div className={`step-label ${index <= currentStep ? 'active' : ''}`}>{step}</div>
                </div>
            ))}
        </div>
    );
}

export default StepperComponent;
