import React from 'react';
import './DisplayDates.css';

function DisplayDates({ dates }) {
    return (
    <div className='displayDates'>
        {dates.map((date, index) => (
            <div key={index} className='divDisplayDates'>
                <div className='inputDisplayDate'>
                    <div>
                        <label htmlFor='text'>כותרת</label>
                        <input type='text' id='text' value={date.title} readOnly/>
                    </div>
                    <div>
                        <label htmlFor='date'>תאריך</label>
                        <input type='date' id='date' value={date.addDate} readOnly/>
                    </div>
                </div>
            </div>
        ))}
    </div>
    );
}

export default DisplayDates;