const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

////////////////////////////////////////////////////
// RECEPTIONIST / ADMIN → schedule appointment
////////////////////////////////////////////////////
router.post(
  "/",
  verifyToken,
  authorizeRoles("RECEPTIONIST", "ADMIN"),
  appointmentController.createAppointment
);

////////////////////////////////////////////////////
// ADMIN / RECEPTIONIST → view all appointments
////////////////////////////////////////////////////
router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  appointmentController.getAppointments
);

////////////////////////////////////////////////////
// DOCTOR → view their own appointments
////////////////////////////////////////////////////
router.get(
  "/doctor",
  verifyToken,
  authorizeRoles("DOCTOR"),
  appointmentController.getDoctorAppointments
);

module.exports = router;