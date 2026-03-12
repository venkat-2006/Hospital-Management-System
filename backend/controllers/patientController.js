const patientModel = require("../models/patientModel");

const getPatients = async (req, res) => {
  try {
    const patients = await patientModel.getPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients" });
  }
};

module.exports = {
  getPatients,
};