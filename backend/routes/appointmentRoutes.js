const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

router.post("/", appointmentController.createAppointment);

router.get("/", appointmentController.getAppointments);

router.get("/doctor/:doctorId", appointmentController.getAppointmentsByDoctor);

module.exports = router;