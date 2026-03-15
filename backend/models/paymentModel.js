const pool = require("../config/db");

const generateReceiptNumber = async () => {
  const year   = new Date().getFullYear();
  const result = await pool.query(
    "SELECT COUNT(*) FROM payments WHERE EXTRACT(YEAR FROM paid_at) = $1",
    [year]
  );
  const seq = parseInt(result.rows[0].count) + 1;
  return `RCP-${year}-${String(seq).padStart(5, "0")}`;
};

const createPayment = async (data) => {
  const receiptNumber = await generateReceiptNumber();
  const result = await pool.query(
    `INSERT INTO payments (bill_id, patient_id, amount, payment_method, receipt_number, notes)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.bill_id, data.patient_id, data.amount, data.payment_method, receiptNumber, data.notes || null]
  );
  return result.rows[0];
};

const getPaymentsByBill = async (billId) => {
  const result = await pool.query("SELECT * FROM payments WHERE bill_id=$1", [billId]);
  return result.rows;
};

// Full data needed for receipt PDF
const getReceiptData = async (paymentId) => {
  const result = await pool.query(
    `SELECT
       pay.*,
       b.total_amount,
       b.appointment_id,
       p.name        AS patient_name,
       p.phone       AS patient_phone,
       p.address     AS patient_address,
       a.appointment_time,
       d.name        AS doctor_name,
       d.specialization
     FROM payments pay
     JOIN bills            b ON pay.bill_id    = b.id
     JOIN patients         p ON pay.patient_id = p.id
     LEFT JOIN appointments a ON b.appointment_id = a.id
     LEFT JOIN doctors      d ON a.doctor_id      = d.id
     WHERE pay.id = $1`,
    [paymentId]
  );
  if (result.rows.length === 0) throw new Error("Receipt not found");
  const receipt = result.rows[0];
  const items = await pool.query(
    "SELECT * FROM bill_items WHERE bill_id = $1 ORDER BY item_type, item_name",
    [receipt.bill_id]
  );
  receipt.items = items.rows;
  return receipt;
};

module.exports = { createPayment, getPaymentsByBill, getReceiptData };