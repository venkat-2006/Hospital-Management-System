const paymentModel = require("../models/paymentModel");
const billModel    = require("../models/billModel");
const pool         = require("../config/db");

// POST /payments  — process payment, mark bill paid
const createPayment = async (req, res) => {
  try {
    const { bill_id, amount, payment_method, notes } = req.body;

    if (!bill_id || !amount || !payment_method)
      return res.status(400).json({ message: "bill_id, amount and payment_method are required" });

    // Get patient_id from the bill
    const billRes = await pool.query("SELECT * FROM bills WHERE id=$1", [bill_id]);
    if (billRes.rows.length === 0)
      return res.status(404).json({ message: "Bill not found" });
    if (billRes.rows[0].status === "paid")
      return res.status(400).json({ message: "Bill already paid" });

    const bill = billRes.rows[0];

    // Create payment record
    const payment = await paymentModel.createPayment({
      bill_id,
      patient_id:     bill.patient_id,
      amount:         bill.total_amount,  // always use bill's total, not client-sent amount
      payment_method,
      notes,
    });

    // Mark bill as paid
    await billModel.updateBillStatus(bill_id, "paid");

    res.json({ message: "Payment successful", payment });

  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    res.status(500).json({ message: "Error processing payment" });
  }
};

// GET /payments/bill/:billId
const getPaymentsByBill = async (req, res) => {
  try {
    const payments = await paymentModel.getPaymentsByBill(req.params.billId);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

// GET /payments/:paymentId/receipt  — full receipt data for PDF
const getReceipt = async (req, res) => {
  try {
    const receipt = await paymentModel.getReceiptData(req.params.paymentId);
    res.json(receipt);
  } catch (error) {
    res.status(404).json({ message: error.message || "Receipt not found" });
  }
};

module.exports = { createPayment, getPaymentsByBill, getReceipt };