const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const patientController = require("../controllers/patientController");

// ─── ADMIN ────────────────────────────────────────────────────────────────────
router.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  patientController.createPatient
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  patientController.getPatients
);

// ─── PATIENT DASHBOARD ────────────────────────────────────────────────────────
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

// ─── DYNAMIC PARAM ROUTES LAST — always below static routes ──────────────────
router.get(
  "/:patientId/profile",
  verifyToken,
  authorizeRoles("DOCTOR", "ADMIN"),
  patientController.getPatientById
);

module.exports = router;