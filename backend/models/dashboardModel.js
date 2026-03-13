const pool = require("../config/db");

/*
Admin statistics
*/
const getAdminStats = async () => {

  const totalPatients = await pool.query(
    "SELECT COUNT(*) FROM users WHERE role='PATIENT'"
  );

  const totalDoctors = await pool.query(
    "SELECT COUNT(*) FROM users WHERE role='DOCTOR'"
  );

  const totalAppointments = await pool.query(
    "SELECT COUNT(*) FROM appointments"
  );

  const totalRevenue = await pool.query(
    "SELECT COALESCE(SUM(amount),0) FROM payments"
  );

  return {
    totalPatients: totalPatients.rows[0].count,
    totalDoctors: totalDoctors.rows[0].count,
    totalAppointments: totalAppointments.rows[0].count,
    totalRevenue: totalRevenue.rows[0].coalesce
  };
};


/*
Doctor statistics
*/
const getDoctorStats = async (doctorId) => {

  const todayAppointments = await pool.query(
    `SELECT COUNT(*) FROM appointments
     WHERE doctor_id=$1
     AND DATE(appointment_time)=CURRENT_DATE`,
    [doctorId]
  );

  const totalRecords = await pool.query(
    `SELECT COUNT(*) FROM medical_records
     WHERE doctor_id=$1`,
    [doctorId]
  );

  return {
    todayAppointments: todayAppointments.rows[0].count,
    totalConsultations: totalRecords.rows[0].count
  };
};


/*
Receptionist statistics
*/
const getReceptionStats = async () => {

  const pendingRequests = await pool.query(
    "SELECT COUNT(*) FROM appointment_requests WHERE status='pending'"
  );

  const todayAppointments = await pool.query(
    `SELECT COUNT(*) FROM appointments
     WHERE DATE(appointment_time)=CURRENT_DATE`
  );

  return {
    pendingRequests: pendingRequests.rows[0].count,
    todayAppointments: todayAppointments.rows[0].count
  };
};


/*
Lab technician statistics
*/
const getLabStats = async () => {

  const pendingTests = await pool.query(
    "SELECT COUNT(*) FROM lab_reports WHERE status='pending'"
  );

  const completedTests = await pool.query(
    "SELECT COUNT(*) FROM lab_reports WHERE status='completed'"
  );

  return {
    pendingTests: pendingTests.rows[0].count,
    completedTests: completedTests.rows[0].count
  };
};

module.exports = {
  getAdminStats,
  getDoctorStats,
  getReceptionStats,
  getLabStats
};