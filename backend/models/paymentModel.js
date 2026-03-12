const pool = require("../config/db");

const createPayment = async (data) => {

  const query = `
    INSERT INTO payments (bill_id, amount, payment_method)
    VALUES ($1,$2,$3)
    RETURNING *`;

  const values = [
    data.bill_id,
    data.amount,
    data.payment_method
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getPaymentsByBill = async (billId) => {

  const result = await pool.query(
    "SELECT * FROM payments WHERE bill_id=$1",
    [billId]
  );

  return result.rows;
};

module.exports = {
  createPayment,
  getPaymentsByBill
};