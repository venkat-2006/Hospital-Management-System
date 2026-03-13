const pool = require("../config/db");
const recordModel = require("../models/recordModel");

const createRecord = async (req, res) => {
  try {
    const userId = req.user.id;

    //  get actual doctor_id from doctors table
    const doctorResult = await pool.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [userId]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const doctorId = doctorResult.rows[0].id;

    const { appointment_id, patient_id, diagnosis, treatment, notes } = req.body;

    const record = await recordModel.createRecord({
      appointment_id,
      patient_id,
      doctor_id: doctorId, //  doctors.id not users.id
      diagnosis,
      treatment,
      notes
    });

    res.json(record);

  } catch (error) {
    console.error("RECORD ERROR:", error);
    res.status(500).json({ message: "Error creating medical record" });
  }
};

const getRecordsByPatient = async (req, res) => {
  try {
    const records = await recordModel.getRecordsByPatient(req.params.patientId);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
};

module.exports = { createRecord, getRecordsByPatient };