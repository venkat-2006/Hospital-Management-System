const pool = require("../config/db");

const createMedicalRecord = async (data) => {

  const query = `
  INSERT INTO medical_records
  (appointment_id, patient_id, doctor_id, diagnosis, treatment)
  VALUES($1,$2,$3,$4,$5)
  RETURNING *`;

  const values = [
    data.appointment_id,
    data.patient_id,
    data.doctor_id,
    data.diagnosis,
    data.treatment
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = { createMedicalRecord };