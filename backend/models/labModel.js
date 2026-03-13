const pool = require("../config/db");

/*
Doctor creates lab request
*/
const createLabReport = async (data) => {

  const query = `
  INSERT INTO lab_reports
  (patient_id, doctor_id, test_type, result, status)
  VALUES ($1,$2,$3,NULL,'pending')
  RETURNING *`;

  const values = [
    data.patient_id,
    data.doctor_id,
    data.test_type
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};


/*
Lab technician updates result
*/
const updateLabResult = async (id, resultValue) => {

  const query = `
  UPDATE lab_reports
  SET result=$1, status='completed'
  WHERE id=$2
  RETURNING *`;

  const result = await pool.query(query, [resultValue, id]);

  return result.rows[0];
};


/*
Get reports by patient
*/
const getReportsByPatient = async (patientId) => {

  const result = await pool.query(
    "SELECT * FROM lab_reports WHERE patient_id=$1",
    [patientId]
  );

  return result.rows;
};


/*
Lab technician view pending tests
*/
const getPendingTests = async () => {

  const result = await pool.query(
    "SELECT * FROM lab_reports WHERE status='pending'"
  );

  return result.rows;
};

module.exports = {
  createLabReport,
  updateLabResult,
  getReportsByPatient,
  getPendingTests
};