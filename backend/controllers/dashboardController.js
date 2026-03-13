const dashboardModel = require("../models/dashboardModel");
const pool = require("../config/db");

const getAdminDashboard = async (req, res) => {
  try {
    const stats = await dashboardModel.getAdminStats();
    res.json(stats);
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Error fetching admin dashboard" });
  }
};

const getDoctorDashboard = async (req, res) => {
  try {
    // Get doctor id from user id in token
    const result = await pool.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const doctorId = result.rows[0].id;
    const stats = await dashboardModel.getDoctorStats(doctorId);
    res.json(stats);
  } catch (error) {
    console.error("DOCTOR DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Error fetching doctor dashboard" });
  }
};

const getReceptionDashboard = async (req, res) => {
  try {
    const stats = await dashboardModel.getReceptionStats();
    res.json(stats);
  } catch (error) {
    console.error("RECEPTION DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Error fetching reception dashboard" });
  }
};

const getLabDashboard = async (req, res) => {
  try {
    const stats = await dashboardModel.getLabStats();
    res.json(stats);
  } catch (error) {
    console.error("LAB DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Error fetching lab dashboard" });
  }
};

module.exports = {
  getAdminDashboard,
  getDoctorDashboard,
  getReceptionDashboard,
  getLabDashboard,
};