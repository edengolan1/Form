const mssql = require("mssql");
const { pool } = require("../config/mssql");

exports.submitForm = async (req, res) => {
  try {
    const formData = req.body;
    const { files, dates, components, subcomponents } = req.body;

    const poolConnect = pool.connect();
    const poolRequest = await poolConnect;
    const request = poolRequest.request();
    const result = await request
      .input("description", mssql.NVarChar, formData.description)
      .input("mainStartDate", mssql.Date, formData.mainStartDate)
      .input("mainEndDate", mssql.Date, formData.mainEndDate)
      .input("questionStartDate", mssql.Date, formData.questionStartDate)
      .input("questionEndDate", mssql.Date, formData.questionEndDate)
      .input("nameProcedure", mssql.NVarChar, formData.nameProcedure)
      .input("numberProcedure", mssql.NVarChar, formData.numberProcedure)
      .input("procedureType", mssql.NVarChar, formData.procedureType)
      .input("sharingProcedure", mssql.NVarChar, formData.sharingProcedure)
      .input("ActivateDigitalBox", mssql.Bit, formData.ActivateDigitalBox)
      .input("MultipleApplications", mssql.Bit, formData.MultipleApplications)
      .input("RenewApplications", mssql.Bit, formData.RenewApplications)
      .input("minCount", mssql.Int, formData.minCount)
      .query(
        "INSERT INTO Form (description, mainStartDate, mainEndDate, questionStartDate, questionEndDate, nameProcedure, numberProcedure, procedureType, sharingProcedure, ActivateDigitalBox, MultipleApplications, RenewApplications, minCount) VALUES (@description, @mainStartDate, @mainEndDate, @questionStartDate, @questionEndDate, @nameProcedure, @numberProcedure, @procedureType, @sharingProcedure, @ActivateDigitalBox, @MultipleApplications, @RenewApplications, @minCount) SELECT SCOPE_IDENTITY() AS formId;"
      );

    const formId = result.recordset[0].formId;

    if (files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          const request = poolRequest.request(); 
          await request
            .input("Name", mssql.NVarChar, file.fileName)
            .input("fileSize", mssql.NVarChar, file.fileSize)
            .input("fileType", mssql.NVarChar, file.fileType)
            .input("formId", mssql.Int, formId).query(`
              INSERT INTO Files (formId, fileName, fileSize, fileType)
              VALUES (@formId, @Name, @fileSize, @fileType);
            `);
        })
      );
    }

    if (dates.length > 0) {
      await Promise.all(
        dates.map(async (date) => {
          const request = poolRequest.request(); 
          await request
            .input("TitleText", mssql.NVarChar, date.title)
            .input("dateAddDate", mssql.Date, date.addDate)
            .input("formId", mssql.Int, formId).query(`
              INSERT INTO Dates (formId, title, addDate)
              VALUES (@formId, @TitleText, @dateAddDate);
            `);
        })
      );
    }

    if (components.length > 0) {
      await Promise.all(
        components.map(async (component) => {
          const request = poolRequest.request();
          await request
            .input(
              "componentDescription",
              mssql.NVarChar,
              component.descriptionComponent
            )
            .input("componentWeight", mssql.Int, component.weight)
            .input("formId", mssql.Int, formId).query(`
              INSERT INTO Components (formId, descriptionComponent, weight)
              VALUES (@formId, @componentDescription, @componentWeight);
            `);
        })
      );
    }
    
    if (subcomponents.length > 0) {
      await Promise.all(
        subcomponents.map(async (subcomponent) => {
          const request = poolRequest.request(); 
          await request
            .input(
              "subcomponentComponentId",
              mssql.Int,
              subcomponent.componentId
            )
            .input(
              "subcomponentDescription",
              mssql.NVarChar,
              subcomponent.descriptionComponent
            )
            .input("subcomponentWeight", mssql.Int, subcomponent.weight).query(`
              INSERT INTO Subcomponents (componentId, descriptionComponent, weight)
              VALUES (@subcomponentComponentId, @subcomponentDescription, @subcomponentWeight);
            `);
        })
      );
    }

    res.status(201).json({ message: "Form data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllFormData = async (req, res) => {
  try {
    const poolConnect = await pool.connect();
    const request = poolConnect.request();
    const result = await request.query("SELECT * FROM Form");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const poolConnect = await pool.connect();
    const request = poolConnect.request();
    const result = await request.query(`SELECT * FROM Files WHERE formId = (SELECT TOP 1 id FROM Form ORDER BY id DESC)`);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDates = async (req, res) => {
  try {
    const poolConnect = await pool.connect();
    const request = poolConnect.request();
    const result = await request.query(`SELECT * FROM Dates WHERE formId = (SELECT TOP 1 id FROM Form ORDER BY id DESC)`);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching dates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getComponentsAndSubcomponents = async (req, res) => {
  try {
    const poolConnect = await pool.connect();
    const request = poolConnect.request();
    const components = await request.query(`SELECT * FROM Components WHERE formId = (SELECT TOP 1 id FROM Form ORDER BY id DESC)`);
    const subcomponents = await request.query(`SELECT * FROM Subcomponents WHERE componentId IN (SELECT id FROM Components WHERE formId = (SELECT TOP 1 id FROM Form ORDER BY id DESC))`);
    res.json({ components: components.recordset, subcomponents: subcomponents.recordset });
  } catch (error) {
    console.error("Error fetching components and subcomponents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getFormCount = async (req, res) => {
  try {
    const poolConnect = await pool.connect();
    const request = poolConnect.request();
    const result = await request.query("SELECT COUNT(*) AS count FROM Form");
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error retrieving form count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const poolConnect = await pool.connect();
    const deleteQueries = [
      `DELETE FROM Subcomponents WHERE componentId IN (SELECT id FROM Components WHERE formId IN (SELECT id FROM Form WHERE id = @formIdToDelete))`,
      `DELETE FROM Components WHERE formId IN (SELECT id FROM Form WHERE id = @formIdToDelete)`,
      `DELETE FROM Dates WHERE formId IN (SELECT id FROM Form WHERE id = @formIdToDelete)`,
      `DELETE FROM Files WHERE formId IN (SELECT id FROM Form WHERE id = @formIdToDelete)`,
      `DELETE FROM Form WHERE id = @formIdToDelete`,
    ];

    for (const query of deleteQueries) {
      await poolConnect
        .request()
        .input("formIdToDelete", mssql.Int, formId)
        .query(query);
    };

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
