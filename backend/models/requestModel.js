const pool = require("../config/db");

const createRequest = async (data) => {

  const query = `
    INSERT INTO appointment_requests
    (patient_id, department, preferred_date, reason)
    VALUES($1,$2,$3,$4)
    RETURNING *
  `;

  const values = [
    data.patient_id,
    data.department,
    data.preferred_date,
    data.reason
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const updateRequestStatus = async (requestId, status) => {

  await pool.query(
    `UPDATE appointment_requests
     SET status=$1
     WHERE id=$2`,
    [status, requestId]
  );

};

const getRequests = async () => {

  const result = await pool.query(
    `SELECT ar.*, p.name as patient_name
     FROM appointment_requests ar
     JOIN patients p ON ar.patient_id = p.id
     ORDER BY ar.created_at DESC`
  );

  return result.rows;
};

const getRequestById = async (id) => {

  const result = await pool.query(
    "SELECT * FROM appointment_requests WHERE id=$1",
    [id]
  );

  return result.rows[0];

};
module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus,
  getRequestById
};