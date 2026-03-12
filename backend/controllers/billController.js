const billModel = require("../models/billModel");

const createBill = async (req, res) => {
  try {
    const bill = await billModel.createBill(req.body);
    res.json(bill);
  } catch (error) {
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