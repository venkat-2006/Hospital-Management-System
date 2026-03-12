const pool = require("../config/db");

const createBill = async (data) => {

  const query = `
  INSERT INTO bills(patient_id, total_amount, status)
  VALUES ($1,$2,$3)
  RETURNING *`;

  const values = [
    data.patient_id,
    data.total_amount,
    data.status
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getBillsByPatient = async (patientId) => {

  const result = await pool.query(
    "SELECT * FROM bills WHERE patient_id=$1",
    [patientId]
  );

  return result.rows;
};

module.exports = {
  createBill,
  getBillsByPatient
};