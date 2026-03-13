const recordModel = require("../models/recordModel");

/*
DOCTOR creates medical record
*/
const createRecord = async (req, res) => {

  try {

    const doctorId = req.user.id;

    const {
      appointment_id,
      patient_id,
      diagnosis,
      treatment,
      notes
    } = req.body;

    const record = await recordModel.createRecord({
      appointment_id,
      patient_id,
      doctor_id: doctorId,
      diagnosis,
      treatment,
      notes
    });

    res.json(record);

  } catch (error) {

    console.error("RECORD ERROR:", error);

    res.status(500).json({
      message: "Error creating medical record"
    });

  }

};


/*
Get records for patient
*/
const getRecordsByPatient = async (req, res) => {

  try {

    const records =
      await recordModel.getRecordsByPatient(req.params.patientId);

    res.json(records);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching records"
    });

  }

};

module.exports = {
  createRecord,
  getRecordsByPatient
};