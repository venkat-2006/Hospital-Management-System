const express = require("express");
const router = express.Router();

const labController = require("../controllers/labController");

router.post("/", labController.createLabReport);
router.get("/:patientId", labController.getReportsByPatient);

module.exports = router;