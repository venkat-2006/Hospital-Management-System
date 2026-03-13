const billModel = require("../models/billModel");

/*
Receptionist generates bill
*/
const createBill = async (req, res) => {

  try {

    const { patient_id, amount } = req.body;

    const bill = await billModel.createBill({
      patient_id,
      amount
    });

    res.json(bill);

  } catch (error) {

    console.error("BILL ERROR:", error);

    res.status(500).json({
      message: "Error creating bill"
    });

  }

};


/*
Patient view their bills
*/
const getBillsByPatient = async (req, res) => {

  try {

    const bills =
      await billModel.getBillsByPatient(req.params.patientId);

    res.json(bills);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching bills"
    });

  }

};

module.exports = {
  createBill,
  getBillsByPatient
};