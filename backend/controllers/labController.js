const labModel = require("../models/labModel");

/*
Doctor creates lab request
*/
const createLabReport = async (req, res) => {

  try {

    const doctorId = req.user.id;

    const { patient_id, test_type } = req.body;

    const report = await labModel.createLabReport({
      patient_id,
      doctor_id: doctorId,
      test_type
    });

    res.json(report);

  } catch (error) {

    console.error("LAB REQUEST ERROR:", error);

    res.status(500).json({
      message: "Error creating lab request"
    });

  }

};


/*
Lab technician view pending tests
*/
const getPendingTests = async (req, res) => {

  try {

    const tests = await labModel.getPendingTests();

    res.json(tests);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching pending tests"
    });

  }

};


/*
Lab technician updates result
*/
const updateLabResult = async (req, res) => {

  try {

    const report = await labModel.updateLabResult(
      req.params.id,
      req.body.result
    );

    res.json(report);

  } catch (error) {

    res.status(500).json({
      message: "Error updating result"
    });

  }

};


/*
Patient view reports
*/
const getReportsByPatient = async (req, res) => {

  try {

    const reports =
      await labModel.getReportsByPatient(req.params.patientId);

    res.json(reports);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching reports"
    });

  }

};

module.exports = {
  createLabReport,
  getPendingTests,
  updateLabResult,
  getReportsByPatient
};