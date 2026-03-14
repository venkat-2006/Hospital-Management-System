const pool = require("../config/db");

const createBill = async (data) => {
  const result = await pool.query(
    `INSERT INTO bills(patient_id, total_amount, status)
     VALUES($1,$2,'pending') RETURNING *`,
    [data.patient_id, data.total_amount]
  );
  return result.rows[0];
};

const getBillsByPatient = async (patientId) => {
  const result = await pool.query(
    `SELECT * FROM bills 
     WHERE patient_id=$1 
     ORDER BY 
       CASE WHEN status='pending' THEN 0 ELSE 1 END,
       created_at DESC`,
    [patientId]
  );
  return result.rows;
};

// get all bills for admin/receptionist
const getAllBills = async () => {
  const result = await pool.query(
    `SELECT 
      b.*,
      p.name as patient_name
     FROM bills b
     JOIN patients p ON b.patient_id = p.id
     ORDER BY
       CASE WHEN b.status='pending' THEN 0 ELSE 1 END,
       b.created_at DESC`
  );
  return result.rows;
};

const updateBillStatus = async (billId, status) => {
  const result = await pool.query(
    `UPDATE bills SET status=$1 WHERE id=$2 RETURNING *`,
    [status, billId]
  );
  return result.rows[0];
};

module.exports = { createBill, getBillsByPatient, getAllBills, updateBillStatus };