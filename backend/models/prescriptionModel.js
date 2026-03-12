const pool = require("../config/db");

const createPrescription = async (data) => {

  const query = `
  INSERT INTO prescriptions
  (record_id, medicine_name, dosage, duration)
  VALUES ($1,$2,$3,$4)
  RETURNING *`;

  const values = [
    data.record_id,
    data.medicine_name,
    data.dosage,
    data.duration
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getPrescriptionsByPatient = async (patientId) => {

  const result = await pool.query(
    `SELECT p.*
     FROM prescriptions p
     JOIN medical_records m ON p.record_id = m.id
     WHERE m.patient_id = $1`,
    [patientId]
  );

  return result.rows;
};

module.exports = {
  createPrescription,
  getPrescriptionsByPatient
};