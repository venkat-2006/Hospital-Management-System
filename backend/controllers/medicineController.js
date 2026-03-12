const medicineModel = require("../models/medicineModel");

const createMedicine = async (req, res) => {
  try {
    const medicine = await medicineModel.createMedicine(req.body);
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Error creating medicine" });
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.getMedicines();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medicines" });
  }
};

module.exports = {
  createMedicine,
  getMedicines
};