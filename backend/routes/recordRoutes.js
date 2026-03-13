const express = require("express");
const router = express.Router();

const recordController = require("../controllers/recordController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

/*
DOCTOR creates medical record
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("DOCTOR"),
  recordController.createRecord
);

/*
DOCTOR / ADMIN view patient records
*/
router.get(
  "/:patientId",
  verifyToken,
  authorizeRoles("DOCTOR", "ADMIN"),
  recordController.getRecordsByPatient
);

module.exports = router;