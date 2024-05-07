import React , { useState } from 'react';
import './ProcedureSettings.css';
import instance from '../../utils/Axios';
import Title from '../../components/forms/title/Title';
import StepperComponent from '../../components/forms/stepper/StepperComponent';
import ProcedureDetails from '../../components/forms/procedureDetails/ProcedureDetails';
import Deadlines from '../../components/forms/deadlines/Deadlines';
import ProcedureDescription from '../../components/forms/procedureDescription/ProcedureDescription';
import ProcedureDocuments from '../../components/forms/procedureDocuments/ProcedureDocuments';
import AddDates from '../../components/forms/addDates/AddDates';
import DisplayDates from '../../components/forms/addDates/displayDates/DisplayDates';
import SammryAndSubmit from '../SammryAndSubmit/SammryAndSubmit';
import DefinitionQualityComponents from '../../components/forms/definitionQualityComponents/DefinitionQualityComponents';

function ProcedureSettings() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        mainDeadlines: { startDate: '', endDate: '' },
        questionDeadlines: { startDate: '', endDate: '' },
        description: '',
        procedureDetails: { nameProcedure: '', numberProcedure: '',minCount: '',checkedItems:[],sharingProcedure:'הליך פתוח',
            procedureType: 'תיחור',ActivateDigitalBox: false,RenewApplications: false, MultipleApplications: false},
        files: [],
        dates: [],
        qualityValue: 30,
        priceValue: 70,
        components: [],
        subcomponents: []
    });

    const handleNextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData()) {
          return;
        }
        console.log("Form Data:", formData,"current step",currentStep);
        try {
            await instance.post("/api/forms", 
            {
              description: formData.description,
              mainStartDate: formData.mainDeadlines.startDate,
              mainEndDate: formData.mainDeadlines.endDate,
              questionStartDate: formData.questionDeadlines.startDate,
              questionEndDate: formData.questionDeadlines.endDate,
              nameProcedure: formData.procedureDetails.nameProcedure,
              numberProcedure: formData.procedureDetails.numberProcedure,
              procedureType: formData.procedureDetails.procedureType,
              sharingProcedure: formData.procedureDetails.sharingProcedure,
              ActivateDigitalBox: formData.procedureDetails.ActivateDigitalBox,
              MultipleApplications: formData.procedureDetails.MultipleApplications,
              RenewApplications: formData.procedureDetails.RenewApplications,
              minCount: formData.procedureDetails.minCount,
              files: formData.files.map(file => ({
                uploadedFiles: { fileName: file.name, fileSize: file.size, fileType: file.type }
                })),
              dates: formData.dates,
              components: formData.components,
              subcomponents: formData.subcomponents
            }
            );
            handleNextStep();
            console.log('Form data submitted successfully');
            } catch (error) {
            console.error("Error submitting form data: ", error);
            }
    }

    const validateFormData = () => {
      const {description,mainDeadlines,questionDeadlines,procedureDetails,qualityValue,priceValue,components,files,dates} = formData;

      if (
        !description || !mainDeadlines.startDate || !mainDeadlines.endDate || !questionDeadlines.startDate || !questionDeadlines.endDate ||
        !procedureDetails.nameProcedure || !procedureDetails.numberProcedure || !qualityValue || !priceValue || !components || !files || !dates) {
        return false;
      }
      return true;
    };

    const handleDescriptionChange = (description) => {
        setFormData({
            ...formData,
            description: description
        });
    };

    const handleProcedureDetailsChange = (details) => {
        setFormData({
            ...formData,
            procedureDetails: {
                ...formData.procedureDetails,
                ...details
            }
        });
    };

    const handleMainDeadlinesChange = ({ startDate, endDate }) => {
        setFormData({
            ...formData,
            mainDeadlines: { startDate, endDate }
        });
    };

    const handleQuestionDeadlinesChange = ({ startDate, endDate }) => {
        setFormData({
            ...formData,
            questionDeadlines: { startDate, endDate }
        });
    };

    const handleFilesChange = (files) => {
        setFormData({
          ...formData,
          files: [...formData.files, files],
        });
    };

    const handleDateAdd = (dateData) => {
        setFormData({
            ...formData,
            dates: [...formData.dates, dateData]
        });
    };

    const handleDefinitionQualityChange = (qualityValue, priceValue,components) => {
        setFormData({
            ...formData,
            qualityValue: qualityValue,
            priceValue: priceValue,
            components: components
        });
    };

    const handleSaveComponent = (data) => {
        const updatedComponents = [...formData.components, data];
        setFormData({
            ...formData,
            components: updatedComponents
        });
    };

    const handleSaveSubcomponent = (data, componentId) => {
        const updatedComponents = formData.components.map(component => {
            if (component.id === componentId) {
                return {
                    ...component,
                    subComponents: component.subComponents ? [...component.subComponents, data] : [data]
                };
            }
            return component;
        });
        setFormData({
            ...formData,
            components: updatedComponents
        });
    };

    return (
      <div className="pageProcedureSettings">
        <div className="divProcedureSettings">
          {currentStep === 0 && (
            <form onSubmit={handleSubmit}>
              <Title text="בניית הליך תחרותי"/>
              <StepperComponent currentStep={currentStep} setCurrentStep={setCurrentStep} />
              <ProcedureDetails
                onDetailsChange={handleProcedureDetailsChange}
              />
              <Deadlines
                title="מועדי הגשה"
                startDate={formData.mainDeadlines.startDate}
                endDate={formData.mainDeadlines.endDate}
                onStartDateChange={(date) =>
                  handleMainDeadlinesChange({
                    startDate: date,
                    endDate: formData.mainDeadlines.endDate,
                  })
                }
                onEndDateChange={(date) =>
                  handleMainDeadlinesChange({
                    startDate: formData.mainDeadlines.startDate,
                    endDate: date,
                  })
                }
              />
              <Deadlines
                title="מועדי שאלות הבהרה"
                startDate={formData.questionDeadlines.startDate}
                endDate={formData.questionDeadlines.endDate}
                onStartDateChange={(date) =>
                  handleQuestionDeadlinesChange({
                    startDate: date,
                    endDate: formData.questionDeadlines.endDate,
                  })
                }
                onEndDateChange={(date) =>
                  handleQuestionDeadlinesChange({
                    startDate: formData.questionDeadlines.startDate,
                    endDate: date,
                  })
                }
              />
              <AddDates onDateAdd={handleDateAdd} />
              <DisplayDates dates={formData.dates} />
              <ProcedureDescription
                onDescriptionChange={handleDescriptionChange}
              />
              <ProcedureDocuments onFilesChange={handleFilesChange} />
              <DefinitionQualityComponents
                onDefinitionQualityChange={handleDefinitionQualityChange}
                onSaveComponent={handleSaveComponent}
                onSaveSubcomponent={handleSaveSubcomponent}
              />
              <div className="buttonSubmit">
                <button type="submit" className="submit">
                  המשך
                </button>
              </div>
            </form>
          )}
          {currentStep === 1 && <SammryAndSubmit />}
        </div>
      </div>
    );
}

export default ProcedureSettings;