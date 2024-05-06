import React , {useState} from 'react';
import './ProcedureDetails.css';
import CheckboxList from './checkboxList/CheckboxList';
import Toggle from './toggle/Toggle';
import InputText from './inputText/InputText';
import Radio from './radio/Radio';

function ProcedureDetails({ onDetailsChange }) {
    const [nameProcedure, setNameProcedure] = useState('');
    const [numberProcedure, setNumberProcedure] = useState('');
    const [minCount, setMinCount] = useState('');
    const [checkedItems, setCheckedItems] = useState([]);
    const [sharingProcedure, setSharingProcedure] = useState('');
    const [procedureType, setProcedureType] = useState('תיחור');
    const [ActivateDigitalBox, setActivateDigitalBox] = useState(false);
    const [RenewApplications, setRenewApplications] = useState(false);
    const [MultipleApplications, setMultipleApplications] = useState(false);

    const handleNameChange = (value) => {
        setNameProcedure(value);
        onDetailsChange({ nameProcedure: value, numberProcedure });
    };

    const handleNumberChange = (value) => {
        setNumberProcedure(value);
        onDetailsChange({ nameProcedure, numberProcedure: value });
    };

    const handleMinCount = (value) => {
        setMinCount(value);
        onDetailsChange({ nameProcedure, numberProcedure, minCount: value });
    };

    const handleCheckboxChange = (value) => {
        setCheckedItems(value);
        onDetailsChange({ nameProcedure, numberProcedure, minCount, checkedItems: value});
    };

    const handleSharingProcedureChange = (value) => {
        setSharingProcedure(value);
        onDetailsChange({ nameProcedure, numberProcedure, minCount, checkedItems, sharingProcedure: value });
    };

    const handleProcedureTypeChange = (value) => {
        setProcedureType(value);
        onDetailsChange({ nameProcedure, numberProcedure, minCount, checkedItems, sharingProcedure, procedureType: value });
    };

    const handleActivateDigitalBoxChange = (value) => {
        setActivateDigitalBox(value);
        onDetailsChange({ nameProcedure, numberProcedure, minCount, checkedItems, sharingProcedure, procedureType, ActivateDigitalBox: value });
    };

    const handleRenewApplicationsChange = (value) => {
        setRenewApplications(value);
        onDetailsChange({ nameProcedure, numberProcedure, minCount, checkedItems, sharingProcedure, procedureType, ActivateDigitalBox, RenewApplications: value });
    };

    const handleMultipleApplicationsChange = (value) => {
        setMultipleApplications(value);
        onDetailsChange({ nameProcedure, numberProcedure, minCount, checkedItems, sharingProcedure, procedureType, ActivateDigitalBox, RenewApplications, MultipleApplications: value });
    };

    return (
        <div className='ProcedureDetails'>
            <div className='divProcedureDetails'>
                    <h3 className='titleProcedureDetails'>פרטי ההליך</h3>
                <div className='typeProcedure'>
                    <label className='labelOfSelect' htmlFor="type">סוג ההליך</label>
                    <select className='divSelect' id='type' name='typeProcedure' value={procedureType} onChange={(e) => handleProcedureTypeChange(e.target.value)} required>
                        <option value="תיחור">תיחור</option>
                        <option value="תיחור2">תיחור2</option>
                    </select>
                </div>
                <InputText label="שם ההליך" value={nameProcedure} onChange={handleNameChange}/>
                <InputText label="מספר ההליך" value={numberProcedure} onChange={handleNumberChange}/>
                <Toggle id="ActivateDigitalBox" label="הפעל תיבה דיגיטלית" checked={ActivateDigitalBox} onToggleChange={handleActivateDigitalBoxChange}/>
                <CheckboxList onCheckboxChange={handleCheckboxChange}/>
                <Toggle id="RenewApplications" label="אפשר הגשות מחודשות עד לתום ההליך" checked={RenewApplications} onToggleChange={handleRenewApplicationsChange}/>
                <Toggle id="MultipleApplications" label="אפשר הגשות מרובות לאותו מציע" checked={MultipleApplications} onToggleChange={handleMultipleApplicationsChange}/>
                <Radio onRadioChange={handleSharingProcedureChange}/>
                <div className='BoxOpeningPermissions'>
                    <label htmlFor='count' className='labelCount'>מינימום כמות מורשי פתיחת תיבה</label>
                    <div>
                        <input type='text' id='count' value={minCount} onChange={(e) => handleMinCount(e.target.value)} className='inputCount' name='countPermissions' required/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProcedureDetails;