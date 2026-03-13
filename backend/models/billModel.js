const pool = require("../config/db");

const createBill = async (data) => {
  const query = `
    INSERT INTO bills
    (patient_id, total_amount, status)
    VALUES ($1,$2,'pending')
    RETURNING *
  `;

  const values = [
    data.patient_id,
    data.total_amount
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

const updateBillStatus = async (billId, status) => {
  const result = await pool.query(
    `UPDATE bills
     SET status=$1
     WHERE id=$2
     RETURNING *`,
    [status, billId]
  );
  return result.rows[0];
};

module.exports = {
  createBill,
  getBillsByPatient,
  updateBillStatus
};