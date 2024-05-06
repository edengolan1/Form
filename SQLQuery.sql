CREATE DATABASE DBExponet;

CREATE TABLE Form (
    id INT PRIMARY KEY IDENTITY,
    description NVARCHAR(255),
    mainStartDate DATE,
    mainEndDate DATE,
    questionStartDate DATE,
    questionEndDate DATE,
    nameProcedure NVARCHAR(255),
    numberProcedure NVARCHAR(50),
    procedureType NVARCHAR(50),
    sharingProcedure NVARCHAR(50),
    ActivateDigitalBox BIT,
    MultipleApplications BIT,
    RenewApplications BIT,
    minCount INT
);

CREATE TABLE Files (
    id INT PRIMARY KEY IDENTITY,
    formId INT,
    fileName NVARCHAR(255),
    fileSize BIGINT,
    fileType NVARCHAR(50),
    FOREIGN KEY (formId) REFERENCES Form(id)
);
CREATE TABLE Dates (
    id INT PRIMARY KEY IDENTITY,
    formId INT,
    title NVARCHAR(255),
    addDate DATE,
    FOREIGN KEY (formId) REFERENCES Form(id)
);

CREATE TABLE Components (
    id INT PRIMARY KEY IDENTITY,
    formId INT,
    descriptionComponent NVARCHAR(255),
    weight INT,
    FOREIGN KEY (formId) REFERENCES Form(id)
);

CREATE TABLE Subcomponents (
    id INT PRIMARY KEY IDENTITY,
    componentId INT,
    descriptionComponent NVARCHAR(255),
    weight INT,
    FOREIGN KEY (componentId) REFERENCES Components(id)
);