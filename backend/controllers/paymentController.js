const paymentModel = require("../models/paymentModel");

const createPayment = async (req, res) => {

  try {
    const payment = await paymentModel.createPayment(req.body);
    res.json(payment);
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    res.status(500).json({ message: "Error creating payment" });
  }

};

const getPaymentsByBill = async (req, res) => {

  try {
    const payments = await paymentModel.getPaymentsByBill(req.params.billId);
    res.json(payments);
  } catch (error) {
    
    res.status(500).json({ message: "Error fetching payments" });
  }

};

module.exports = {
  createPayment,
  getPaymentsByBill
};