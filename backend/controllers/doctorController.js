const pool = require("../config/db");
const doctorModel = require("../models/doctorModel");

const getDoctorId = async (userId) => {
  const result = await pool.query(
    "SELECT id FROM doctors WHERE user_id = $1",
    [userId]
  );
  if (result.rows.length === 0) throw new Error("Doctor profile not found");
  return result.rows[0].id;
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.getDoctors();
    res.json(doctors);
  } catch (error) {
    console.error("GET DOCTORS ERROR:", error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT d.*, u.email
       FROM doctors d
       JOIN users u ON d.user_id = u.id
       WHERE d.user_id = $1`,
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const doctorId = await getDoctorId(req.user.id);
    const appointments = await doctorModel.getDoctorAppointments(doctorId);
    res.json(appointments);
  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

const getMyPatients = async (req, res) => {
  try {
    const doctorId = await getDoctorId(req.user.id);
    const patients = await doctorModel.getDoctorPatients(doctorId);
    res.json(patients);
  } catch (error) {
    console.error("GET PATIENTS ERROR:", error);
    res.status(500).json({ message: "Error fetching patients" });
  }
};

const getMyPatientData = async (req, res) => {
  try {
    const doctorId = await getDoctorId(req.user.id);
    const data = await doctorModel.getPatientFullData(doctorId, req.params.patientId);
    res.json(data);
  } catch (error) {
    console.error("GET PATIENT DATA ERROR:", error);
    res.status(500).json({ message: "Error fetching patient data" });
  }
};

module.exports = {
  getDoctors,
  getMyProfile,
  getMyAppointments,
  getMyPatients,
  getMyPatientData
};