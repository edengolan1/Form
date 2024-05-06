import React from 'react';
import './Deadlines.css';

function Deadlines({ title,startDate, endDate, onStartDateChange, onEndDateChange }) {
    return (
        <div className='deadline'>
            <div className='divDeadline'>
                <h3>{title}</h3>
                <div className='dates'>
                    <div className='startDate'>
                        <label htmlFor='dateStart' className='labelDate'>תאריך פתיחה</label>
                        <input type='date' id="dateStart" className='inputDate' name='dateStart' value={startDate} onChange={(e) => onStartDateChange(e.target.value)} required/>
                    </div>
                    <div className='endDate'>
                        <label htmlFor='dateEnd' className='labelDate'>תאריך סגירה</label>
                        <input type='date' id='dateEnd' className='inputDate' name='dateEnd' value={endDate} onChange={(e) => onEndDateChange(e.target.value)} required/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Deadlines;
