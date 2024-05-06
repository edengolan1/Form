const express = require('express');
const formController = require('../controllers/formController');

const router = express.Router();

router.post("/api/forms", formController.submitForm);
router.get("/api/getData", formController.getAllFormData);
router.get("/api/getDates/:id", formController.getDates);
router.get("/api/getFiles/:id", formController.getFiles);
router.get("/api/getComponentsAndSubcomponents/:id", formController.getComponentsAndSubcomponents);
router.get("/api/getFormCount", formController.getFormCount)
router.delete("/api/delete/:id", formController.deleteForm);

module.exports = router;