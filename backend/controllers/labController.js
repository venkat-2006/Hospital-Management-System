const pool = require("../config/db");
const labModel = require("../models/labModel");

const createLabReport = async (req, res) => {
  try {
    const userId = req.user.id;

    //  get actual doctor_id
    const doctorResult = await pool.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [userId]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const doctorId = doctorResult.rows[0].id;

    const { patient_id, test_type } = req.body;

    const report = await labModel.createLabReport({
      patient_id,
      doctor_id: doctorId,
      test_type
    });

    res.json(report);

  } catch (error) {
    console.error("LAB REQUEST ERROR:", error);
    res.status(500).json({ message: "Error creating lab request" });
  }
};

const getPendingTests = async (req, res) => {
  try {
    const tests = await labModel.getPendingTests();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending tests" });
  }
};

const updateLabResult = async (req, res) => {
  try {
    const report = await labModel.updateLabResult(req.params.id, req.body.result);
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error updating result" });
  }
};

const getReportsByPatient = async (req, res) => {
  try {
    const reports = await labModel.getReportsByPatient(req.params.patientId);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};
const getDoctorLabReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const doctorResult = await pool.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [userId]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const doctorId = doctorResult.rows[0].id;

    const reports = await labModel.getReportsByDoctor(doctorId);
    res.json(reports);

  } catch (error) {
    console.error("GET DOCTOR LAB REPORTS ERROR:", error);
    res.status(500).json({ message: "Error fetching lab reports" });
  }
};

module.exports = { createLabReport, getPendingTests, updateLabResult, getReportsByPatient ,getDoctorLabReports};