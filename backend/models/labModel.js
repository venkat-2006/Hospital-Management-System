const pool = require("../config/db");

const createLabReport = async (data) => {
  const result = await pool.query(
    `INSERT INTO lab_reports(patient_id, doctor_id, test_type, result, status)
     VALUES($1,$2,$3,NULL,'pending') RETURNING *`,
    [data.patient_id, data.doctor_id, data.test_type]
  );
  return result.rows[0];
};

const updateLabResult = async (id, resultValue) => {
  const result = await pool.query(
    `UPDATE lab_reports SET result=$1, status='completed'
     WHERE id=$2 RETURNING *`,
    [resultValue, id]
  );
  return result.rows[0];
};

const getReportsByPatient = async (patientId) => {
  const result = await pool.query(
    "SELECT * FROM lab_reports WHERE patient_id=$1",
    [patientId]
  );
  return result.rows;
};

const getPendingTests = async () => {
  const result = await pool.query(
    "SELECT * FROM lab_reports WHERE status='pending'"
  );
  return result.rows;
};

// added here like others
const getReportsByDoctor = async (doctorId) => {
  const result = await pool.query(
    `SELECT 
      l.*,
      p.name as patient_name
     FROM lab_reports l
     JOIN patients p ON l.patient_id = p.id
     WHERE l.doctor_id = $1
     ORDER BY l.created_at DESC`,
    [doctorId]
  );
  return result.rows;
};

module.exports = {
  createLabReport,
  updateLabResult,
  getReportsByPatient,
  getPendingTests,
  getReportsByDoctor
};