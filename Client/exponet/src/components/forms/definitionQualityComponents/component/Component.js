import React ,{ useEffect, useState } from 'react';
import './Component.css';
import Subcomponent from './subcomponent/Subcomponent';

function Component({id,descriptionComponent: initialDescription, weight: initialWeight, onAddSubcomponent,onSaveComponent ,onDeleteComponent}) {
    const [descriptionComponent, setDescriptionComponent] = useState(initialDescription || '');
    const [weight, setWeight] = useState(initialWeight || '');
    const [subComponents, setSubComponents] = useState([]);

    const handleAddSubComponent = (e) => {
        e.preventDefault(); 
        setSubComponents([...subComponents, { id: subComponents.length, descriptionComponent: '', weight: 0 }]);
        handleSaveComponent();
    };

    const handleDeleteSubComponent = (id) => {
        setSubComponents(subComponents.filter(sub => sub.id !== id));
        handleSaveComponent();
    };

    const handleSaveComponent = () => {
        const componentData = {
            id,
            descriptionComponent,
            weight,
            subComponents: subComponents.map(sub => ({ ...sub }))
        };
        onSaveComponent(componentData);
    };
    const handleDeleteComponent = () => {
        onDeleteComponent();
    };

    const handleSaveSubComponent = (id, updatedSubComponent) => {
        const updatedSubComponents = subComponents.map(sub => {
            if (sub.id === id) {
                return updatedSubComponent;
            }
            return sub;
        });
        setSubComponents(updatedSubComponents);
        handleSaveComponent(); 
    };

    const handleDescriptionChange = (e) => {
        setDescriptionComponent(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    useEffect(() => {
        handleSaveComponent();
    }, [descriptionComponent, weight, subComponents]);
    
    return (
        <div className='component'>
            <div>
                <div className='inputSectionDescription'>
                    <input type='text' placeholder='תיאור סעיף' className='inputTextComponent' value={descriptionComponent} onChange={handleDescriptionChange}/>
                </div>
                <div className='inputWeightOptions'>
                    <input type='text' placeholder='משקל' value={weight} onChange={handleWeightChange} className='inputNumberWeight'/>
                </div>
                <div className='subcomponent'>
                    <button className='buttonSubcomponent' onClick={handleAddSubComponent}>תת רכיב<span className='plusSubcomponent'>+</span></button>
                </div>
                <div className='deleteComponent'>
                    <button onClick={handleDeleteComponent} className='buttonDeleteComponent'></button>
                </div>
            </div>
            {subComponents.map(sub => (
                <Subcomponent key={sub.id} onDelete={handleDeleteSubComponent} id={sub.id} onSaveSubcomponent={(updatedSubComponent) => handleSaveSubComponent(sub.id, updatedSubComponent)} descriptionComponent={sub.descriptionComponent} weight={sub.weight} />
            ))}
        </div>
    );
}

export default Component;