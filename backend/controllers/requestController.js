const requestModel = require("../models/requestModel");

const createRequest = async (req, res) => {

  try {

    const patientId = req.user.id; // coming from JWT

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