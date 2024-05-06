import React from 'react';
import './Toggle.css';

function Toggle({ id, label, checked, onToggleChange}) {

    const handleToggleChange = () => {
        onToggleChange(!checked);
    };

    return (
        <div className='TurnOnBox'>
            <label htmlFor={id} className='labelTurnOnBox'>{label}</label>
            <input type="checkbox" id={id} className="toggle-checkbox" checked={checked} onChange={handleToggleChange}/>
            <label htmlFor={id} className="toggle-label"></label>
        </div>
    );
}

export default Toggle;