import React , {useState} from 'react';
import './DefinitionQualityComponents.css';
import plus from '../../../assets/plus.png';
import Component from './component/Component';

function DefinitionQualityComponents({ onDefinitionQualityChange }) {
    const [qualityValue, setQualityValue] = useState(30);
    const [components, setComponents] = useState([]);

    const priceValue = 100 - qualityValue;

    const handleSliderChange = (e) => {
        const newValue = parseInt(e.target.value);
        setQualityValue(newValue);
        const priceValue = 100 - qualityValue;
        onDefinitionQualityChange(newValue, priceValue, components); 
    };

    const handleAddComponent = (e) => {
        e.preventDefault(); 
        const updatedComponents = [...components, { 
            id: components.length, 
            descriptionComponent: '', 
            weight: '', 
            subComponents: [] 
        }];
        setComponents(updatedComponents);
        onDefinitionQualityChange(qualityValue, 100 - qualityValue, updatedComponents);
    };

    const handleDeleteComponent = (id) => {
        setComponents(components.filter(component => component.id !== id));
    };

    const handleAddSubcomponent = (componentId) => {
        const updatedComponents = components.map(comp => {
            if (comp.id === componentId) {
                return {
                    ...comp,
                    subComponents: comp.subComponents ? [...comp.subComponents, { id: comp.subComponents.length, descriptionComponent: '', weight: '' }] : [{ id: 0, descriptionComponent: '', weight: '' }],
                    weight: comp.weight - 1 
                };
            }
            return comp;
        });
        setComponents(updatedComponents);
        onDefinitionQualityChange(qualityValue, 100 - qualityValue, updatedComponents);
    };

    const handleSaveComponent = (updatedComponent) => {
        const updatedComponents = components.map(comp =>
            comp.id === updatedComponent.id ? updatedComponent : comp
        );
        setComponents(updatedComponents);
        onDefinitionQualityChange(qualityValue, 100 - qualityValue, updatedComponents);
    };

    return (
        <div className='DefinitionQualityComponents'>
            <div className='divDefinitionQualityComponents'>
                <div className='title-Button'>
                    <div className='titleDefinition'>
                        <h3>הגדרת רכיבי איכות</h3>
                    </div>
                    <div className='divButtonDefinition'>
                        <button className='buttonDefinition' onClick={handleAddComponent}>הוספת רכיבי איכות
                            <img src={plus} alt='AddQualityComponents'/>
                        </button>
                    </div>
                </div>
                <div className='qualityAndPrice'>
                    <div className='Quality'>
                        <label htmlFor='quality' className='labelInput'>רכיבי איכות</label>
                        <div>
                            <input type='text' id='quality' className='inputQuality' value={qualityValue} onChange={(e) => setQualityValue(parseInt(e.target.value))} readOnly/>
                            <div className='divPrecent'>
                                <div className='precent'>%</div>
                            </div>
                        </div>
                    </div>
                    <div className='weight'>
                        <input type="range" className="percentSlider" dir="rtl" name="percentSlider" min="0" max="100" value={qualityValue} onChange={handleSliderChange}/>
                    </div>
                    <div className='Price'>
                        <label htmlFor='quality' className='labelInput'>רכיבי מחיר</label>
                        <div>
                            <input type='text' id='quality' className='inputQuality' value={priceValue} readOnly/>
                            <div className='divPrecent'>
                                <div className='precent'>%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='optionsDefinition'>
                    <div className='description-weight'>
                        <div className='sectionDescription'>
                            <div>תיאור סעיף</div>
                        </div>
                        <div className='weightOptions'>
                            <div>משקל</div>
                        </div>
                    </div>
                    {components.map(comp => (
                        <Component key={comp.id}
                        id={comp.id}
                        descriptionComponent={comp.descriptionComponent}
                        weight={comp.weight}
                        onAddSubcomponent={handleAddSubcomponent}
                        onDeleteComponent={() => handleDeleteComponent(comp.id)}
                        onSaveComponent={handleSaveComponent} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DefinitionQualityComponents;