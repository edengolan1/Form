import React , {useState} from 'react';
import './ProcedureDescription.css';

function ProcedureDescription({onDescriptionChange}) {
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        onDescriptionChange(e.target.value);
    };

    return (
        <div className='ProcedureDescription'>
            <div className='divTitleDescription'>
                <div className='titleDescription'>
                    <h3>תיאור ההליך</h3>
                </div>
            </div>
            <div className='textareaDescription'>
                <textarea name='ProcedureDescription' placeholder='..הקלד כאן' value={description} onChange={handleDescriptionChange} required></textarea>
            </div>
        </div>
    );
}

export default ProcedureDescription;