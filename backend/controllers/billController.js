const billModel = require("../models/billModel");

const createBill = async (req, res) => {
  try {
    const { patient_id, amount, appointment_id } = req.body;
    if (!patient_id || !amount)
      return res.status(400).json({ message: "patient_id and amount are required" });
    const bill = await billModel.createBill({ patient_id, appointment_id, total_amount: amount });
    res.json(bill);
  } catch (error) {
    console.error("BILL ERROR:", error);
    res.status(500).json({ message: "Error creating bill" });
  }
};

const getBillsByPatient = async (req, res) => {
  try {
    res.json(await billModel.getBillsByPatient(req.params.patientId));
  } catch (error) {
    res.status(500).json({ message: "Error fetching bills" });
  }
};

const getAllBills = async (req, res) => {
  try {
    res.json(await billModel.getAllBills());
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bills" });
  }
};

const updateBillStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["paid", "pending"].includes(status))
      return res.status(400).json({ message: "Status must be paid or pending" });
    const bill = await billModel.updateBillStatus(req.params.billId, status);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error updating bill" });
  }
};

module.exports = { createBill, getBillsByPatient, getAllBills, updateBillStatus };