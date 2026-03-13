const pool = require("../config/db");
const patientModel = require("../models/patientModel");

// existing functions
const createPatient = async (req, res) => {
  try {
    const patient = await patientModel.createPatient(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient" });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await patientModel.getPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients" });
  }
};

//////////////////////////////////////////////////////////
// PATIENT DASHBOARD APIs
//////////////////////////////////////////////////////////

// 1️ Patient Profile
const getPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT id,name,email,role FROM users WHERE id=$1",
      [userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// 2️ Patient Appointments
const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const result = await pool.query(
        "SELECT a.*, d.name AS doctor_name",
        FROM, appointments, a,
        JOIN, doctors, d, ON, a.doctor_id = d.id,
        WHERE, a.patient_id = $1, ","[patientId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// 3️ Medical Records
const getMyRecords = async (req, res) => {
  try {
    const patientId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM medical_records WHERE patient_id=$1",
      [patientId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
};

// 4️ Prescriptions
const getMyPrescriptions = async (req, res) => {
  try {
    const patientId = req.user.id;

    const result = await pool.query(
      `SELECT p.*
       FROM prescriptions p
       JOIN medical_records m ON p.record_id = m.id
       WHERE m.patient_id=$1`,
      [patientId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
};

// 5️ Lab Reports
const getMyLabReports = async (req, res) => {
  try {
    const patientId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM lab_reports WHERE patient_id=$1",
      [patientId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lab reports" });
  }
};

// 6️ Bills
const getMyBills = async (req, res) => {
  try {
    const patientId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM bills WHERE patient_id=$1",
      [patientId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bills" });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientProfile,
  getMyAppointments,
  getMyRecords,
  getMyPrescriptions,
  getMyLabReports,
  getMyBills
};