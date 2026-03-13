const appointmentModel = require("../models/appointmentModel");
const requestModel = require("../models/requestModel");

/*
RECEPTIONIST schedules appointment
*/
const createAppointment = async (req, res) => {

  try {

    const { request_id, patient_id, doctor_id, appointment_time } = req.body;

    // check doctor slot availability
    const slotTaken = await appointmentModel.checkDoctorSlot(
      doctor_id,
      appointment_time
    );

    if (slotTaken) {
      return res.status(400).json({
        message: "Doctor already has appointment at this time"
      });
    }

    // create appointment
    const appointment = await appointmentModel.createAppointment({
      request_id,
      patient_id,
      doctor_id,
      appointment_time
    });

    // update request status
    await requestModel.updateRequestStatus(
      request_id,
      "scheduled"
    );

    res.json({
      message: "Appointment scheduled successfully",
      appointment
    });

  } catch (error) {

    console.error("APPOINTMENT ERROR:", error);

    res.status(500).json({
      message: "Error scheduling appointment"
    });

  }

};


/*
Get all appointments
*/
const getAppointments = async (req, res) => {

  try {

    const appointments = await appointmentModel.getAppointments();

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching appointments"
    });

  }

};


/*
Doctor view their appointments
*/
const getDoctorAppointments = async (req, res) => {

  try {

    const doctorId = req.user.id;

    const appointments =
      await appointmentModel.getAppointmentsByDoctor(doctorId);

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching doctor appointments"
    });

  }

};

module.exports = {
  createAppointment,
  getAppointments,
  getDoctorAppointments
};