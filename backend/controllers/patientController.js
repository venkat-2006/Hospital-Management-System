const pool = require("../config/db");
const patientModel = require("../models/patientModel");

//////////////////////////////////////////////////////////
// BASIC PATIENT MANAGEMENT
//////////////////////////////////////////////////////////

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

const getPatientId = async (userId) => {
  const patient = await pool.query(
    "SELECT id FROM patients WHERE user_id=$1",
    [userId]
  );
  if (patient.rows.length === 0) throw new Error("Patient profile not found");
  return patient.rows[0].id;
};

//////////////////////////////////////////////////////////

// 1️⃣ Patient Profile
const getPatientProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.email, u.role,
              p.name, p.gender, p.phone, p.address, p.date_of_birth
       FROM users u
       JOIN patients p ON u.id = p.user_id
       WHERE u.id = $1`,
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

//////////////////////////////////////////////////////////

// 2️⃣ Appointments — includes doctor name
const getMyAppointments = async (req, res) => {
  try {
    const patientId = await getPatientId(req.user.id);
    const result = await pool.query(
      `SELECT a.*, d.name AS doctor_name, d.specialization
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       WHERE a.patient_id = $1
       ORDER BY a.appointment_time DESC`,
      [patientId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("APPOINTMENT ERROR:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

//////////////////////////////////////////////////////////

// 3️⃣ Medical Records — includes doctor name
const getMyRecords = async (req, res) => {
  try {
    const patientId = await getPatientId(req.user.id);
    const result = await pool.query(
      `SELECT mr.*, d.name AS doctor_name, d.specialization
       FROM medical_records mr
       LEFT JOIN doctors d ON mr.doctor_id = d.id
       WHERE mr.patient_id = $1
       ORDER BY mr.created_at DESC`,
      [patientId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
};

//////////////////////////////////////////////////////////

const getMyPrescriptions = async (req, res) => {
  try {
    const patientId = await getPatientId(req.user.id);
    const result = await pool.query(
      `SELECT 
        pr.*,
        mr.diagnosis,
        d.name AS doctor_name,
        d.specialization
       FROM prescriptions pr
       JOIN medical_records mr ON pr.record_id = mr.id
       LEFT JOIN doctors d ON mr.doctor_id = d.id
       WHERE mr.patient_id = $1
       ORDER BY pr.id DESC`,
      [patientId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("PRESCRIPTIONS ERROR:", error.message);
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
};

//////////////////////////////////////////////////////////

// 5️⃣ Lab Reports
const getMyLabReports = async (req, res) => {
  try {
    const patientId = await getPatientId(req.user.id);
    const result = await pool.query(
      `SELECT lr.*, d.name AS doctor_name
       FROM lab_reports lr
       LEFT JOIN doctors d ON lr.doctor_id = d.id
       WHERE lr.patient_id = $1
       ORDER BY lr.created_at DESC`,
      [patientId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lab reports" });
  }
};

//////////////////////////////////////////////////////////

const getMyBills = async (req, res) => {
  try {
    const patientId = await getPatientId(req.user.id);

    const bills = await pool.query(
      `SELECT 
        b.*,
        pay.id             AS payment_id,
        pay.amount         AS paid_amount,
        pay.payment_method,
        pay.paid_at        AS payment_date,
        pay.receipt_number
       FROM bills b
       LEFT JOIN payments pay ON pay.bill_id = b.id
       WHERE b.patient_id = $1
       ORDER BY
         CASE WHEN b.status = 'pending' THEN 0 ELSE 1 END,
         b.created_at DESC`,
      [patientId]
    );

    // attach bill_items to each bill
    const result = [];
    for (const bill of bills.rows) {
      const items = await pool.query(
        `SELECT * FROM bill_items WHERE bill_id = $1 ORDER BY item_type, item_name`,
        [bill.id]
      );
      result.push({ ...bill, items: items.rows });
    }

    res.json(result);

  } catch (error) {
    console.error("BILLS ERROR:", error.message);
    res.status(500).json({ message: "Error fetching bills" });
  }
};

//////////////////////////////////////////////////////////

const getPatientById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE id = $1",
      [req.params.patientId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Patient not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient" });
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
  getMyBills,
  getPatientById,
};
///