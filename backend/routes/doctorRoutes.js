const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  doctorController.getDoctors
);

router.get(
  "/my-profile",
  verifyToken,
  authorizeRoles("DOCTOR"),
  doctorController.getMyProfile
);

router.get(
  "/my-appointments",
  verifyToken,
  authorizeRoles("DOCTOR"),
  doctorController.getMyAppointments
);

router.get(
  "/my-patients",
  verifyToken,
  authorizeRoles("DOCTOR"),
  doctorController.getMyPatients
);

router.get(
  "/my-patients/:patientId",
  verifyToken,
  authorizeRoles("DOCTOR"),
  doctorController.getMyPatientData
);

module.exports = router;
