import React, {useState} from 'react';
import './Radio.css';

function Radio({ onRadioChange }) {
    const [selectedOption, setSelectedOption] = useState('הליך פתוח');

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        onRadioChange(value);
    };

    return (
        <div className='sharingProcedure'>
            <label className='labelSharingProcedure'>שיתוף הליך</label><br/>
            <div className='optionRadio'>
                <div>
                    <label htmlFor='close' className='labelRadio'>הליך סגור</label>
                    <input type='radio' id='close' name='sharingProcedure' value="הליך סגור" checked={selectedOption === "הליך סגור"}
                    onChange={handleOptionChange} className='checkboxSharingProcedure'/>
                </div>
                <div>
                    <label htmlFor='open' className='labelRadio'>הליך פתוח</label>
                    <input type='radio' id='open' name='sharingProcedure' value="הליך פתוח" checked={selectedOption === "הליך פתוח"}
                    onChange={handleOptionChange} className='checkboxSharingProcedure'/>
                </div>
            </div>
        </div>
    );
}

export default Radio;