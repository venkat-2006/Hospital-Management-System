const express = require("express");
const router = express.Router();

const labController = require("../controllers/labController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  verifyToken,
  authorizeRoles("DOCTOR"),
  labController.createLabReport
);

router.get(
  "/pending",
  verifyToken,
  authorizeRoles("LAB_TECH"),
  labController.getPendingTests
);

router.get(
  "/patient/:patientId",
  verifyToken,
  authorizeRoles("PATIENT", "DOCTOR", "ADMIN"),
  labController.getReportsByPatient
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("DOCTOR", "ADMIN"),
  labController.getDoctorLabReports
);

router.patch(
  "/:id",
  verifyToken,
  authorizeRoles("LAB_TECH"),
  labController.updateLabResult
);

module.exports = router;