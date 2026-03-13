const express = require("express");
const router = express.Router();

const labController = require("../controllers/labController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

/*
Doctor requests lab test
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("DOCTOR"),
  labController.createLabReport
);

/*
Lab technician view pending tests
*/
router.get(
  "/pending",
  verifyToken,
  authorizeRoles("LAB_TECH"),
  labController.getPendingTests
);

/*
Lab technician update result
*/
router.patch(
  "/:id",
  verifyToken,
  authorizeRoles("LAB_TECH"),
  labController.updateLabResult
);

/*
Patient / doctor view reports
*/
router.get(
  "/patient/:patientId",
  verifyToken,
  authorizeRoles("PATIENT","DOCTOR","ADMIN"),
  labController.getReportsByPatient
);

module.exports = router;