import React, { useState } from 'react';
import './CheckboxList.css';

function CheckboxList({ onCheckboxChange }) {
  const [items, setItems] = useState([
    { id: 1, name: "תנאי סף ללא מחיר", checked: false ,disabled: false},
    { id: 2, name: "ציון איכות", checked: false ,disabled: false},
    { id: 3, name: "עיון בהצעות", checked: true ,disabled: true}
  ]);

  const handleCheckboxChange = (itemId) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    onCheckboxChange(updatedItems.filter(item => item.checked).map(item => item.name));
  };

  return (
    <div className='afterFinished'>
      <label htmlFor="" className='labelCheckbox'>שלבי בדיקה לאחר סיום ההליך</label>
      <div className='divCheckboxList'>
        {items.map(item => (
          <div key={item.id} className='CheckboxList'>
            <input
              type="checkbox"
              id={`item${item.id}`}
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)} className='checked' disabled={item.disabled}
            />
            <label htmlFor={`item${item.id}`} className='item'>{item.name}</label>
          </div>
        ))}
        </div>
    </div>
  );
}

export default CheckboxList;
