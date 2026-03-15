const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN", "RECEPTIONIST"),  // ← add RECEPTIONIST
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
router.patch(
  "/my-appointments/:appointmentId",
  verifyToken,
  authorizeRoles("DOCTOR"),
  doctorController.updateMyAppointment
);
module.exports = router;
