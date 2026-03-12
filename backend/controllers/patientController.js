const patientModel = require("../models/patientModel");

const createPatient = async (req, res) => {
  try {
    const patient = await patientModel.createPatient(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient" });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await patientModel.getPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients" });
  }
};

module.exports = {
  createPatient,
  getPatients
};