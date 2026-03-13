const billModel = require("../models/billModel");

const createBill = async (req, res) => {
  try {
    const { patient_id, amount } = req.body;

    if (!patient_id || !amount) {
      return res.status(400).json({ message: "patient_id and amount are required" });
    }

    const bill = await billModel.createBill({
      patient_id,
      total_amount: amount
    });

    res.json(bill);

  } catch (error) {
    console.error("BILL ERROR:", error);
    res.status(500).json({ message: "Error creating bill" });
  }
};

const getBillsByPatient = async (req, res) => {
  try {
    const bills = await billModel.getBillsByPatient(req.params.patientId);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bills" });
  }
};

module.exports = {
  createBill,
  getBillsByPatient
};