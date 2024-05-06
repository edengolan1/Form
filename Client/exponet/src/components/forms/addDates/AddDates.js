import React , {useState} from 'react';
import './AddDates.css';
import iconPlus from '../../../assets/plus.png';

function AddDates({ onDateAdd }) {
    const [title, setTitle] = useState('');
    const [addDate, setAddDate] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDateChange = (e) => {
        setAddDate(e.target.value);
    };

    const handleAddDate = (e) => {
        e.preventDefault(); 
        if (title && addDate) {
            onDateAdd({ title, addDate });
            setTitle('');
            setAddDate('');
        }
    };

    return (
        <div className='addDates'>
            <div className='divAddDates'>
                <div className='labelAndButton'>
                    <div className='labelAndDates'>
                        <h3>הוספת תאריכים</h3>
                    </div>
                    <div className='buttonAddDate'>
                        <button onClick={handleAddDate}>הוספת תאריך
                            <img src={iconPlus} alt='Add Date'/>
                        </button>
                    </div>
                </div>
                <div className='inputDates'>
                    <div>
                        <label htmlFor='text'>כותרת</label>
                        <input type='text' id='text' value={title} onChange={handleTitleChange} placeholder="הקלד כותרת" />
                    </div>
                    <div>
                        <label htmlFor='date'>תאריך</label>
                        <input type='date' id='date' value={addDate} onChange={handleDateChange} placeholder="בחר תאריך" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDates;