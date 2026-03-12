const requestModel = require("../models/requestModel");

const createRequest = async (req, res) => {

  try {
    const request = await requestModel.createRequest(req.body);
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Error creating request" });
  }

};

const getRequests = async (req, res) => {

  try {
    const requests = await requestModel.getRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests" });
  }

};

module.exports = {
  createRequest,
  getRequests
};