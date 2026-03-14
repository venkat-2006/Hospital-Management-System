const prescriptionModel = require("../models/prescriptionModel");
const medicineModel = require("../models/medicineModel");

const createPrescription = async (req, res) => {
  try {
    const { record_id, medicine_name, dosage, duration } = req.body;

    const prescription = await prescriptionModel.createPrescription({
      record_id,
      medicine_name,
      dosage,
      duration
    });

    // auto deduct stock when prescribed
    const deducted = await medicineModel.deductStock(medicine_name, 1);
    if (!deducted) {
      console.warn(`Stock low or medicine not found: ${medicine_name}`);
    }

    res.json(prescription);

  } catch (error) {
    console.error("PRESCRIPTION ERROR:", error);
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

module.exports = { createPrescription, getPrescriptionsByPatient };