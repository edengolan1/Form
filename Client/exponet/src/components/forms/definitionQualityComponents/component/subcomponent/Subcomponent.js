import React , {useState} from 'react';
import './Subcomponent.css';

function Subcomponent({ onDelete, id,onSaveSubcomponent ,descriptionComponent: initialDescription, weight: initialWeight,}) {
    const [descriptionComponent, setDescriptionComponent] = useState(initialDescription || '');
    const [weight, setWeight] = useState(initialWeight || '');

    const handleSaveSubcomponent = () => {
        onSaveSubcomponent({ id, descriptionComponent, weight });
    };

    const handleDescriptionChange = (e) => {
        setDescriptionComponent(e.target.value);
        handleSaveSubcomponent();
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
        handleSaveSubcomponent();
    };

    return (
        <div className='component'>
            <div>
                <div className='inputSectionDescription2'>
                    <input type='text' placeholder='תיאור סעיף' value={descriptionComponent} onChange={handleDescriptionChange} className='inputTextComponent2'/>
                </div>
                <div className='inputWeightOptions'>
                    <input type='text' placeholder='משקל' value={weight} onChange={handleWeightChange} className='inputNumberWeight'/>
                </div>
                <div className='subcomponent'>
                    <button className='buttonSubcomponent2'>תת רכיב<span className='plusSubcomponent'>+</span></button>
                </div>
                <div className='deleteComponent'>
                    <button className='buttonDeleteComponent' onClick={() => onDelete(id)}></button>
                </div>
            </div>
        </div>
    );
}

export default Subcomponent;