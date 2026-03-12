const doctorModel = require("../models/doctorModel");

const createDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.createDoctor(req.body);
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor" });
  }
};

const getDoctors = async (req, res) => {
  const doctors = await doctorModel.getDoctors();
  res.json(doctors);
};

module.exports = {
  createDoctor,
  getDoctors
};