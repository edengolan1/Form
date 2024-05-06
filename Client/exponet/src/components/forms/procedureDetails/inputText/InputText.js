import React from 'react';
import './InputText.css';

function InputText({ label, value, onChange }) {
    return (
        <div className='nameProcedure'>
            <label htmlFor="nameProcedure" className='labelName'>{label}</label>
            <input type='text' id='nameProcedure' value={value} name='nameProcedure' onChange={(e) => onChange(e.target.value)} className='inputNameProcedure' required/>
        </div>
    );
}

export default InputText;