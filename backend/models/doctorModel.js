const pool = require("../config/db");

const getDoctors = async () => {
  const result = await pool.query(
    `SELECT d.*, u.email 
     FROM doctors d 
     JOIN users u ON d.user_id = u.id`
  );
  return result.rows;
};

const getDoctorPatients = async (doctorId) => {
  const result = await pool.query(
    `SELECT DISTINCT
      p.id as patient_id,
      p.name,
      p.gender,
      p.phone,
      p.address,
      p.date_of_birth
     FROM patients p
     JOIN appointments a ON a.patient_id = p.id
     WHERE a.doctor_id = $1`,
    [doctorId]
  );
  return result.rows;
};

const getPatientFullData = async (doctorId, patientId) => {
  const appointments = await pool.query(
    `SELECT * FROM appointments
     WHERE doctor_id = $1 AND patient_id = $2
     ORDER BY appointment_time DESC`,
    [doctorId, patientId]
  );

  const records = await pool.query(
    `SELECT * FROM medical_records
     WHERE doctor_id = $1 AND patient_id = $2`,
    [doctorId, patientId]
  );

  const prescriptions = await pool.query(
    `SELECT pr.* FROM prescriptions pr
     JOIN medical_records mr ON pr.record_id = mr.id
     WHERE mr.doctor_id = $1 AND mr.patient_id = $2`,
    [doctorId, patientId]
  );

  const labReports = await pool.query(
    `SELECT * FROM lab_reports
     WHERE doctor_id = $1 AND patient_id = $2`,
    [doctorId, patientId]
  );

  return {
    appointments: appointments.rows,
    medical_records: records.rows,
    prescriptions: prescriptions.rows,
    lab_reports: labReports.rows
  };
};

const updateAppointmentStatus = async (appointmentId, doctorId, status) => {
  const result = await pool.query(
    `UPDATE appointments
     SET status = $1
     WHERE id = $2 AND doctor_id = $3
     RETURNING *`,
    [status, appointmentId, doctorId]
  );

  if (result.rows.length === 0) return null;

  const appointment = result.rows[0];

  if (appointment.request_id) {
    await pool.query(
      `UPDATE appointment_requests
       SET status = $1
       WHERE id = $2`,
      [status, appointment.request_id]
    );
  }

  return appointment;
};

const getDoctorAppointments = async (doctorId) => {
  const result = await pool.query(
    `SELECT
      a.*,
      p.name  AS patient_name,
      p.phone AS patient_phone
     FROM appointments a
     JOIN patients p ON a.patient_id = p.id
     WHERE a.doctor_id = $1
     ORDER BY a.appointment_time ASC`,
    [doctorId]
  );
  return result.rows;
};

module.exports = {
  getDoctors,
  getDoctorPatients,
  getPatientFullData,
  getDoctorAppointments,
  updateAppointmentStatus,
};