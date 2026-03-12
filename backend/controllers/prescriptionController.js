const prescriptionModel = require("../models/prescriptionModel");

const createPrescription = async (req, res) => {
  try {
    const prescription = await prescriptionModel.createPrescription(req.body);
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Error creating prescription" });
  }
};

const getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await prescriptionModel.getPrescriptionsByPatient(req.params.patientId);
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
};

module.exports = {
  createPrescription,
  getPrescriptionsByPatient
};