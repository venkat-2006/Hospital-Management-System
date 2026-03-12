const pool = require("../config/db");

const createRequest = async (data) => {

  const query = `
  INSERT INTO appointment_requests
  (patient_id, department, preferred_date, reason)
  VALUES($1,$2,$3,$4)
  RETURNING *`;

  const values = [
    data.patient_id,
    data.department,
    data.preferred_date,
    data.reason
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getRequests = async () => {

  const result = await pool.query(
    "SELECT * FROM appointment_requests"
  );

  return result.rows;
};

module.exports = {
  createRequest,
  getRequests
};