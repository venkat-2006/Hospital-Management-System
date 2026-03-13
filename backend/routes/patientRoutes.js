const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const patientController = require("../controllers/patientController");

//////////////////////////////////////////////////////////
// ADMIN APIs
//////////////////////////////////////////////////////////

router.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  patientController.createPatient
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  patientController.getPatients
);

//////////////////////////////////////////////////////////
// PATIENT DASHBOARD APIs
//////////////////////////////////////////////////////////

router.get(
  "/profile",
  verifyToken,
  authorizeRoles("PATIENT"),
  patientController.getPatientProfile
);

router.get(
  "/appointments",
  verifyToken,
  authorizeRoles("PATIENT"),
  patientController.getMyAppointments
);

router.get(
  "/medical-records",
  verifyToken,
  authorizeRoles("PATIENT"),
  patientController.getMyRecords
);

router.get(
  "/prescriptions",
  verifyToken,
  authorizeRoles("PATIENT"),
  patientController.getMyPrescriptions
);

router.get(
  "/lab-reports",
  verifyToken,
  authorizeRoles("PATIENT"),
  patientController.getMyLabReports
);

router.get(
  "/bills",
  verifyToken,
  authorizeRoles("PATIENT"),
  patientController.getMyBills
);

module.exports = router;