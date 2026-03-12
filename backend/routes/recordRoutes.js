const express = require("express");
const router = express.Router();

const recordController = require("../controllers/recordController");

router.post("/", recordController.createRecord);
router.get("/:patientId", recordController.getRecordsByPatient);

module.exports = router;