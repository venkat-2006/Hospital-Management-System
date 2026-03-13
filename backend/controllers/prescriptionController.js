const prescriptionModel = require("../models/prescriptionModel");

/*
Doctor creates prescription
*/
const createPrescription = async (req, res) => {

  try {

    const { record_id, medicine_name, dosage, duration } = req.body;

    const prescription = await prescriptionModel.createPrescription({
      record_id,
      medicine_name,
      dosage,
      duration
    });

    res.json(prescription);

  } catch (error) {

    console.error("PRESCRIPTION ERROR:", error);

    res.status(500).json({
      message: "Error creating prescription"
    });

  }

};


/*
Get prescriptions for patient
*/
const getPrescriptionsByPatient = async (req, res) => {

  try {

    const prescriptions =
      await prescriptionModel.getPrescriptionsByPatient(req.params.patientId);

    res.json(prescriptions);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching prescriptions"
    });

  }

};

module.exports = {
  createPrescription,
  getPrescriptionsByPatient
};