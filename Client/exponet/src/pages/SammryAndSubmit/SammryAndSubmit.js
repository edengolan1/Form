import React, { useEffect, useState } from "react";
import "./SammryAndSubmit.css";
import Title from "../../components/forms/title/Title";
import instance from "../../utils/Axios";
import StepperComponent from "../../components/forms/stepper/StepperComponent";
import DivData from "./divData/DivData";

function SammryAndSubmit() {
  const [formData, setFormData] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [datesData, setDatesData] = useState([]);
  const [componentsData, setComponentsData] = useState([]);
  const [subcomponentsData, setSubcomponentsData] = useState([]);
  const [lastFormData, setLastFormData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get("/api/getData");
      console.log(response.data, formData);
      if (Array.isArray(response.data)) {
        setFormData(response.data);
        setLastFormData(response.data[response.data.length - 1]);
        const formId = response.data[response.data.length - 1].id;
        const filesResponse = await instance.get(
          `/api/getFiles/${formId}`
        );
        setFilesData(filesResponse.data);

        const datesResponse = await instance.get(
          `/api/getDates/${formId}`
        );
        setDatesData(datesResponse.data);

        const componentsAndSubcomponentsResponse = await instance.get(
          `/api/getComponentsAndSubcomponents/${formId}`
        );
        setComponentsData(componentsAndSubcomponentsResponse.data.components);
        setSubcomponentsData(
          componentsAndSubcomponentsResponse.data.subcomponents
        );
      } else {
        console.error("Data received is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const approval = () => {
    alert("The form is approved!");
    window.location.href = "/api/forms";
  };

  const handleDelete = async () => {
    try {
      await instance.delete(`/api/delete/${lastFormData.id}`);
      fetchData();
      alert("Form deleted successfully");
      window.location.href = "/api/forms";
      console.log("Form deleted successfully");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <Title text="סיכום ושליחה" />
      <StepperComponent currentStep="1" />
      <div className="SammryAndSubmit">
        {lastFormData && (
          <div>
            <DivData label="סוג ההליך" value={lastFormData.procedureType} />
            <DivData label="שם ההליך" value={lastFormData.nameProcedure} />
            <DivData label="מספר ההליך" value={lastFormData.numberProcedure} />
            <DivData
              label="הפעל תיבה דיגיטלית"
              value={lastFormData.ActivateDigitalBox}
            />
            <DivData
              label="אפשר הגשות מחודשות עד לתום ההליך"
              value={lastFormData.RenewApplications}
            />
            <DivData
              label="אפשר הגשות מרובות לאותו מציע"
              value={lastFormData.MultipleApplications}
            />
            <DivData label="שיתוף הליך" value={lastFormData.sharingProcedure} />
            <DivData
              label="מינימום כמות מורשי פתיחת תיבה"
              value={lastFormData.description}
            />
            <div>
              <h3 className="h3">מועדי הגשה</h3>
              <DivData
                label="תאריך פתיחה"
                value={formatDate(lastFormData.mainStartDate)}
              />
              <DivData
                label="תאריך סגירה"
                value={formatDate(lastFormData.mainEndDate)}
              />
            </div>
            <div>
              <h3 className="h3">מועדי שאלות הבהרה</h3>
              <DivData
                label="תאריך פתיחה"
                value={formatDate(lastFormData.questionStartDate)}
              />
              <DivData
                label="תאריך סגירה"
                value={formatDate(lastFormData.questionEndDate)}
              />
            </div>
            <div>
              <h3 className="h3">הוספת תאריכים</h3>
              {datesData.map((date, index) => (
                <DivData
                  key={index}
                  label={date.title}
                  value={formatDate(date.addDate)}
                />
              ))}
            </div>
            <DivData label="תיאור ההליך" value={lastFormData.description} />
            <div>
              <h3 className="h3">קבצים</h3>
              {filesData.map((file, index) => (
                <div key={index}>
                  <DivData label="id" value={file.id}/>
                  <DivData label="שם הקובץ" value={file.fileName}/>
                  <DivData label="גודל הקובץ" value={file.fileSize}/>
                  <DivData label="סוג הקובץ" value={file.fileType}/>
                </div>
              ))}
            </div>
            <div>
              <h3 className="h3">רכיבים ותתי רכיבים</h3>
              {componentsData.map((component, index) => (
                <div key={index}>
                  <h3 className="h3">רכיב</h3>
                  <DivData label="תיאור סעיף" value={component.descriptionComponent}/>
                  <DivData label="משקל" value={component.weight}/>
                  {subcomponentsData
                    .filter(
                      (subcomponent) =>
                        subcomponent.componentId === component.id
                    )
                    .map((subcomponent, subindex) => (
                      <div key={subindex}>
                        <h3 className="h3">תת רכיב</h3>
                        <DivData label="תיאור סעיף" value={subcomponent.descriptionComponent}/>
                        <DivData label="משקל" value={subcomponent.weight}/>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div className="Approval">
              <button onClick={approval} className="buttonApproval">
                אישור
              </button>
              <button onClick={handleDelete} className="buttonApproval">
                מחיקה
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SammryAndSubmit;
