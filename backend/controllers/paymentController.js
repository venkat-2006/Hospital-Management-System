const paymentModel = require("../models/paymentModel");
const billModel = require("../models/billModel");

/*
Patient makes payment
*/
const createPayment = async (req, res) => {

  try {

    const { bill_id, amount, payment_method } = req.body;

    // create payment record
    const payment = await paymentModel.createPayment({
      bill_id,
      amount,
      payment_method
    });

    // update bill status to paid
    await billModel.updateBillStatus(bill_id, "paid");

    res.json({
      message: "Payment successful",
      payment
    });

  } catch (error) {

    console.error("PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Error creating payment"
    });

  }

};


/*
View payments for a bill
*/
const getPaymentsByBill = async (req, res) => {

  try {

    const payments =
      await paymentModel.getPaymentsByBill(req.params.billId);

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching payments"
    });

  }

};

module.exports = {
  createPayment,
  getPaymentsByBill
};