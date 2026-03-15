const pool = require("../config/db");

const generateBillForAppointment = async (appointmentId, patientId, doctorId) => {
  const existing = await pool.query("SELECT id FROM bills WHERE appointment_id=$1", [appointmentId]);
  if (existing.rows.length > 0) return existing.rows[0];

  const items = [];

  const prescriptions = await pool.query(
    `SELECT pr.*, m.price AS medicine_price, m.name AS medicine_name
     FROM prescriptions pr
     JOIN medical_records mr ON pr.record_id = mr.id
     LEFT JOIN medicines m ON pr.medicine_id = m.id
     WHERE mr.patient_id=$1 AND mr.doctor_id=$2`,
    [patientId, doctorId]
  );
  for (const rx of prescriptions.rows) {
    const qty = parseInt(rx.quantity) || 1;
    const up  = parseFloat(rx.medicine_price) || 0;
    items.push({ item_type:"medicine", item_name: rx.medicine_name || "Medicine", quantity: qty, unit_price: up, total_price: up * qty });
  }

  const labs = await pool.query(
    "SELECT * FROM lab_reports WHERE patient_id=$1 AND doctor_id=$2",
    [patientId, doctorId]
  );
  for (const lab of labs.rows) {
    const up = parseFloat(lab.price) || 0;
    items.push({ item_type:"lab_test", item_name: lab.test_type, quantity: 1, unit_price: up, total_price: up });
  }

  const total = items.reduce((s, i) => s + i.total_price, 0);
  const billRes = await pool.query(
    `INSERT INTO bills (patient_id, appointment_id, total_amount, status)
     VALUES ($1,$2,$3,'pending') RETURNING *`,
    [patientId, appointmentId, total]
  );
  const bill = billRes.rows[0];

  for (const item of items) {
    await pool.query(
      `INSERT INTO bill_items (bill_id, item_type, item_name, quantity, unit_price, total_price)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [bill.id, item.item_type, item.item_name, item.quantity, item.unit_price, item.total_price]
    );
  }
  return bill;
};

const createBill = async (data) => {
  const result = await pool.query(
    `INSERT INTO bills (patient_id, appointment_id, total_amount, status)
     VALUES ($1,$2,$3,'pending') RETURNING *`,
    [data.patient_id, data.appointment_id || null, data.total_amount]
  );
  return result.rows[0];
};

// ─── KEY FIX: use subquery to get latest payment per bill, no duplicates ──────
const getAllBills = async () => {
  const bills = await pool.query(
    `SELECT
       b.*,
       p.name             AS patient_name,
       p.phone            AS patient_phone,
       a.appointment_time,
       pay.id             AS payment_id,
       pay.receipt_number,
       pay.payment_method,
       pay.paid_at        AS payment_date
     FROM bills b
     JOIN patients p ON b.patient_id = p.id
     LEFT JOIN appointments a ON b.appointment_id = a.id
     LEFT JOIN LATERAL (
       SELECT * FROM payments
       WHERE bill_id = b.id
       ORDER BY paid_at DESC
       LIMIT 1
     ) pay ON true
     ORDER BY
       CASE WHEN b.status='pending' THEN 0 ELSE 1 END,
       b.created_at DESC`
  );

  const result = [];
  for (const bill of bills.rows) {
    const items = await pool.query(
      "SELECT * FROM bill_items WHERE bill_id=$1 ORDER BY item_type, item_name",
      [bill.id]
    );
    result.push({ ...bill, items: items.rows });
  }
  return result;
};

const getBillsByPatient = async (patientId) => {
  const bills = await pool.query(
    `SELECT
       b.*,
       a.appointment_time,
       pay.id             AS payment_id,
       pay.receipt_number,
       pay.payment_method,
       pay.paid_at        AS payment_date
     FROM bills b
     LEFT JOIN appointments a ON b.appointment_id = a.id
     LEFT JOIN LATERAL (
       SELECT * FROM payments
       WHERE bill_id = b.id
       ORDER BY paid_at DESC
       LIMIT 1
     ) pay ON true
     WHERE b.patient_id=$1
     ORDER BY
       CASE WHEN b.status='pending' THEN 0 ELSE 1 END,
       b.created_at DESC`,
    [patientId]
  );

  const result = [];
  for (const bill of bills.rows) {
    const items = await pool.query(
      "SELECT * FROM bill_items WHERE bill_id=$1 ORDER BY item_type, item_name",
      [bill.id]
    );
    result.push({ ...bill, items: items.rows });
  }
  return result;
};

const updateBillStatus = async (billId, status) => {
  const result = await pool.query(
    "UPDATE bills SET status=$1 WHERE id=$2 RETURNING *",
    [status, billId]
  );
  return result.rows[0];
};

module.exports = {
  generateBillForAppointment,
  createBill,
  getAllBills,
  getBillsByPatient,
  updateBillStatus,
};