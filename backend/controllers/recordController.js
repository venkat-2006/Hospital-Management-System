const recordModel = require("../models/recordModel");

const createRecord = async (req, res) => {
  try {
    const record = await recordModel.createRecord(req.body);
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error creating medical record" });
  }
};

const getRecordsByPatient = async (req, res) => {
  try {
    const records = await recordModel.getRecordsByPatient(req.params.patientId);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
};

module.exports = {
  createRecord,
  getRecordsByPatient
};