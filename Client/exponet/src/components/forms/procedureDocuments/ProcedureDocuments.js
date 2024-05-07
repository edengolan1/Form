import React from 'react';
import { useRef , useState } from 'react';
import './ProcedureDocuments.css';
import imsageUploadFile from '../../../assets/uploadFiles.png';

function ProcedureDocuments({ onFilesChange }) {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [showNameFile, setShowNameFile] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const size = file.size / 1024;
        setFileSize(size.toFixed(2));
        const newName = ''; 
        setUploadedFiles([...uploadedFiles, file]);
        setFileName([...fileName, newName]);
        onFilesChange([...uploadedFiles, file], [...fileName, newName]);
        setUploadedFiles([...uploadedFiles, file]);
        onFilesChange([...uploadedFiles, file]);
    };

    const handleFileNameChange = (e, index) => {
        const name = e.target.value;
        const updatedFileNames = [...fileName];
        updatedFileNames[index] = name;
        setFileName(updatedFileNames);
    
        const updatedFiles = [...uploadedFiles];
        updatedFiles[index] = { ...uploadedFiles[index], name };
        setUploadedFiles(updatedFiles);
    
        onFilesChange(updatedFiles, updatedFileNames);
    };

    const handleDelete = (index) => {
        const filteredFiles = uploadedFiles.filter((file, i) => i !== index);
        const filteredNames = fileName.filter((name, i) => i !== index);
        setUploadedFiles(filteredFiles);
        setFileName(filteredNames);
        onFilesChange(filteredFiles, filteredNames);
    };

    const handleMoreClick = (index,e) => {
        e.preventDefault();
        const updatedShowNameFile = [...showNameFile];
        updatedShowNameFile[index] = !updatedShowNameFile[index]; 
        setShowNameFile(updatedShowNameFile);
    };

    return (
        <div className='ProcedureDocuments'>
            <div className='divProcedureDocuments'>
                <h3 className='titleProcedureDocuments'>מסמכי ההליך</h3>
                <div className='divUploadDocuments'>
                    <div className='uploadDocuments' onClick={handleImageClick}>
                        <img src={imsageUploadFile} alt='Upload File' width= '168px' height= '171px'/>
                        <input type='file' id='file' ref={fileInputRef} onChange={handleFileChange} className='inputFile'/>
                    </div>
                </div>
                <div className='allFiles'>
                    {uploadedFiles.map((file, index) => (<>
                    <div>
                    <div className='Operationsfile' key={index}>
                        <div className='divButtonMoving'>
                            <button className='buttonMoving'></button>
                        </div>
                        <div className='smallImageFile'>
                            <button className='pdf'></button>
                        </div>
                        <div className='nameOfFile'><span>{fileSize} KB</span> {file.name}</div>
                        <div className='filesOptions'>
                            <div className='privateAndDelete'>
                                <div className='private'>
                                    <button className='buttonPrivate'></button>
                                </div>
                                <div className='delete'>
                                    <button className='buttonDelete' onClick={() => handleDelete(index)}></button>
                                </div>
                            </div>
                            <div className='more'>
                                <button className={`buttonMore ${showNameFile[index] ? 'active' : ''}`} onClick={(e) => handleMoreClick(index, e)}></button>
                            </div>
                        </div>
                    </div>
                    {showNameFile[index] && (
                    <div className='nameFile'>
                        <div className='divNameFile'>
                            <input type='text' id='nameFile' value={fileName[index]} onChange={(e) => handleFileNameChange(e, index)}/>
                            <label htmlFor='nameFile'><span>*</span> שם הקובץ</label>
                        </div>
                    </div>
                    )}
                    </div>
                    </>))}
                </div>
            </div>
        </div>
    );
}

export default ProcedureDocuments;