const appointmentModel = require("../models/appointmentModel");

const createAppointment = async (req, res) => {

  try {

    const appointment = await appointmentModel.createAppointment(req.body);

    res.json(appointment);

  } catch (error) {

    res.status(500).json({ message: "Error creating appointment" });

  }

};

const getAppointments = async (req, res) => {

  try {

    const appointments = await appointmentModel.getAppointments();

    res.json(appointments);

  } catch (error) {

    res.status(500).json({ message: "Error fetching appointments" });

  }

};

const getAppointmentsByDoctor = async (req, res) => {

  try {

    const appointments =
      await appointmentModel.getAppointmentsByDoctor(req.params.doctorId);

    res.json(appointments);

  } catch (error) {

    res.status(500).json({ message: "Error fetching doctor appointments" });

  }

};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentsByDoctor
};