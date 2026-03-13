const dashboardModel = require("../models/dashboardModel");

/*
Admin dashboard
*/
const getAdminStats = async (req, res) => {

  try {

    const stats = await dashboardModel.getAdminStats();

    res.json(stats);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching admin stats"
    });

  }

};


/*
Doctor dashboard
*/
const getDoctorStats = async (req, res) => {

  try {

    const doctorId = req.user.id;

    const stats = await dashboardModel.getDoctorStats(doctorId);

    res.json(stats);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching doctor stats"
    });

  }

};


/*
Receptionist dashboard
*/
const getReceptionStats = async (req, res) => {

  try {

    const stats = await dashboardModel.getReceptionStats();

    res.json(stats);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching receptionist stats"
    });

  }

};


/*
Lab technician dashboard
*/
const getLabStats = async (req, res) => {

  try {

    const stats = await dashboardModel.getLabStats();

    res.json(stats);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching lab stats"
    });

  }

};

module.exports = {
  getAdminStats,
  getDoctorStats,
  getReceptionStats,
  getLabStats
};