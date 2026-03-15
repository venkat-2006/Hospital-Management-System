const pool = require("../config/db");
const appointmentModel = require("../models/appointmentModel");
const requestModel = require("../models/requestModel");

const createAppointment = async (req, res) => {
  try {
    const { request_id, patient_id, doctor_id, appointment_time } = req.body;

    const request = await requestModel.getRequestById(request_id);
    if (!request) {
      return res.status(404).json({ message: "Appointment request not found" });
    }

    const doctorSlotTaken = await appointmentModel.checkDoctorSlot(doctor_id, appointment_time);
    if (doctorSlotTaken) {
      return res.status(400).json({ message: "Doctor already has an appointment at this time" });
    }

    const patientSlotTaken = await appointmentModel.checkPatientSlot(patient_id, appointment_time);
    if (patientSlotTaken) {
      return res.status(400).json({ message: "Patient already has an appointment at this time" });
    }

    const appointment = await appointmentModel.createAppointment({
      request_id, patient_id, doctor_id, appointment_time
    });

    await requestModel.updateRequestStatus(request_id, "scheduled");

    res.json({ message: "Appointment scheduled successfully", appointment });

  } catch (error) {
    console.error("APPOINTMENT ERROR:", error);
    res.status(500).json({ message: "Error scheduling appointment" });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAppointments();
    res.json(appointments);
  } catch (error) {
    console.error("APPOINTMENT ERROR:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const doctorResult = await pool.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [userId]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const doctorId = doctorResult.rows[0].id;
    const appointments = await appointmentModel.getAppointmentsByDoctor(doctorId);
    res.json(appointments);

  } catch (error) {
    console.error("DOCTOR APPOINTMENTS ERROR:", error);
    res.status(500).json({ message: "Error fetching doctor appointments" });
  }
};

const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAppointmentsByDoctor(req.params.doctorId);
    res.json(appointments);
  } catch (error) {
    console.error("DOCTOR SCHEDULE ERROR:", error);
    res.status(500).json({ message: "Error fetching doctor schedule" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getDoctorAppointments,
  getAppointmentsByDoctorId
};