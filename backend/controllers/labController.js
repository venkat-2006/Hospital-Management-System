const labModel = require("../models/labModel");

const createLabReport = async (req, res) => {
  try {
    const report = await labModel.createLabReport(req.body);
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error creating lab report" });
  }
};

const getReportsByPatient = async (req, res) => {
  try {
    const reports = await labModel.getReportsByPatient(req.params.patientId);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lab reports" });
  }
};

module.exports = {
  createLabReport,
  getReportsByPatient
};