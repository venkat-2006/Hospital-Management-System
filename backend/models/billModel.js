const pool = require("../config/db");

/*
Create bill
*/
const createBill = async (data) => {

  const query = `
    INSERT INTO billing
    (patient_id, amount, status)
    VALUES ($1,$2,'pending')
    RETURNING *
  `;

  const values = [
    data.patient_id,
    data.amount
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};


/*
Get bills for patient
*/
const getBillsByPatient = async (patientId) => {

  const result = await pool.query(
    "SELECT * FROM billing WHERE patient_id=$1",
    [patientId]
  );

  return result.rows;
};


/*
Update bill status
*/
const updateBillStatus = async (billId, status) => {

  const result = await pool.query(
    `UPDATE billing
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