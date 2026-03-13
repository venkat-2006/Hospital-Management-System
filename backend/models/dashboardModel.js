const pool = require("../config/db");

const getAdminStats = async () => {
  const [patients, doctors, appointments, pendingRequests, pendingLabTests, revenue] =
    await Promise.all([
      pool.query("SELECT COUNT(*) FROM patients"),
      pool.query("SELECT COUNT(*) FROM doctors"),
      pool.query("SELECT COUNT(*) FROM appointments"),
      pool.query("SELECT COUNT(*) FROM appointment_requests WHERE status='pending'"),
      pool.query("SELECT COUNT(*) FROM lab_reports WHERE status='pending'"),
      pool.query("SELECT SUM(amount) FROM payments"),
    ]);

  return {
    totalPatients:      parseInt(patients.rows[0].count),
    totalDoctors:       parseInt(doctors.rows[0].count),
    totalAppointments:  parseInt(appointments.rows[0].count),
    pendingRequests:    parseInt(pendingRequests.rows[0].count),
    pendingLabTests:    parseInt(pendingLabTests.rows[0].count),
    totalRevenue:       parseFloat(revenue.rows[0].sum) || 0,
  };
};

const getDoctorStats = async (doctorId) => {
  const [todayAppts, totalPatients, pendingLabs] = await Promise.all([
    pool.query(
      `SELECT COUNT(*) FROM appointments
       WHERE doctor_id = $1
       AND DATE(appointment_time) = CURRENT_DATE`,
      [doctorId]
    ),
    pool.query(
      `SELECT COUNT(DISTINCT patient_id) FROM appointments
       WHERE doctor_id = $1`,
      [doctorId]
    ),
    pool.query(
      `SELECT COUNT(*) FROM lab_reports
       WHERE status = 'pending'`
    ),
  ]);

  return {
    todayAppointments:  parseInt(todayAppts.rows[0].count),
    totalPatients:      parseInt(totalPatients.rows[0].count),
    pendingLabReports:  parseInt(pendingLabs.rows[0].count),
  };
};

const getReceptionStats = async () => {
  const [pendingRequests, appointmentsToday, patients] = await Promise.all([
    pool.query(
      "SELECT COUNT(*) FROM appointment_requests WHERE status='pending'"
    ),
    pool.query(
      `SELECT COUNT(*) FROM appointments
       WHERE DATE(appointment_time) = CURRENT_DATE`
    ),
    pool.query("SELECT COUNT(*) FROM patients"),
  ]);

  return {
    pendingRequests:    parseInt(pendingRequests.rows[0].count),
    appointmentsToday:  parseInt(appointmentsToday.rows[0].count),
    patientsRegistered: parseInt(patients.rows[0].count),
  };
};

const getLabStats = async () => {
  const [pending, completed] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM lab_reports WHERE status='pending'"),
    pool.query("SELECT COUNT(*) FROM lab_reports WHERE status='completed'"),
  ]);

  return {
    pendingTests:   parseInt(pending.rows[0].count),
    completedTests: parseInt(completed.rows[0].count),
  };
};

module.exports = {
  getAdminStats,
  getDoctorStats,
  getReceptionStats,
  getLabStats,
};