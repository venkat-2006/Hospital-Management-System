const requestModel = require("../models/requestModel");
const pool = require("../config/db");

const createRequest = async (req, res) => {

  try {

    const userId = req.user.id; // from JWT

    // get patient profile linked to this user
    const patient = await pool.query(
      "SELECT id FROM patients WHERE user_id=$1",
      [userId]
    );

    if (patient.rows.length === 0) {
      return res.status(400).json({
        message: "Patient profile not found"
      });
    }

    const patientId = patient.rows[0].id;

    const { department, preferred_date, reason } = req.body;

    const request = await requestModel.createRequest({
      patient_id: patientId,
      department,
      preferred_date,
      reason
    });

    res.json(request);

  } catch (error) {

    console.error("REQUEST ERROR:", error);

    res.status(500).json({
      message: "Error creating request"
    });

  }

};


const getRequests = async (req, res) => {

  try {

    const requests = await requestModel.getRequests();

    res.json(requests);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching requests"
    });

  }

};

module.exports = {
  createRequest,
  getRequests
};