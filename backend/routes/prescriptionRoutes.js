const express = require("express");
const router = express.Router();

const prescriptionController = require("../controllers/prescriptionController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

/*
DOCTOR creates prescription
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("DOCTOR"),
  prescriptionController.createPrescription
);

/*
PATIENT / DOCTOR / ADMIN view prescriptions
*/
router.get(
  "/:patientId",
  verifyToken,
  authorizeRoles("DOCTOR", "ADMIN", "PATIENT"),
  prescriptionController.getPrescriptionsByPatient
);

module.exports = router;