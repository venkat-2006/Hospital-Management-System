const pool = require("../config/db");

const createRecord = async (data) => {
  const query = `
    INSERT INTO medical_records
    (appointment_id, patient_id, doctor_id, diagnosis, treatment)
    VALUES ($1,$2,$3,$4,$5)
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

const getRecordsByPatient = async (patientId) => {
  const result = await pool.query(
    "SELECT * FROM medical_records WHERE patient_id=$1",
    [patientId]
  );

  return result.rows;
};

module.exports = {
  createRecord,
  getRecordsByPatient
};