const pool = require("../config/db");

const createAppointment = async (data) => {
  const result = await pool.query(
    `INSERT INTO appointments(request_id, patient_id, doctor_id, appointment_time)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [data.request_id, data.patient_id, data.doctor_id, data.appointment_time]
  );
  return result.rows[0];
};

const checkDoctorSlot = async (doctorId, appointmentTime) => {
  const result = await pool.query(
    `SELECT * FROM appointments
     WHERE doctor_id = $1
     AND ABS(EXTRACT(EPOCH FROM (appointment_time - $2::timestamp))) < 1800`,
    [doctorId, appointmentTime]
  );
  return result.rows.length > 0;
};

const checkPatientSlot = async (patientId, appointmentTime) => {
  const result = await pool.query(
    `SELECT * FROM appointments
     WHERE patient_id = $1
     AND ABS(EXTRACT(EPOCH FROM (appointment_time - $2::timestamp))) < 1800`,
    [patientId, appointmentTime]
  );
  return result.rows.length > 0;
};

const getAppointments = async () => {
  const result = await pool.query(
    `SELECT 
      a.*,
      p.name AS patient_name,
      d.name AS doctor_name
     FROM appointments a
     JOIN patients p ON a.patient_id = p.id
     JOIN doctors d ON a.doctor_id = d.id
     ORDER BY a.appointment_time`
  );
  return result.rows;
};

const getAppointmentsByDoctor = async (doctorId) => {
  const result = await pool.query(
    `SELECT 
      a.*,
      p.name AS patient_name
     FROM appointments a
     JOIN patients p ON a.patient_id = p.id
     WHERE a.doctor_id = $1
     ORDER BY a.appointment_time`,
    [doctorId]
  );
  return result.rows;
};

module.exports = { createAppointment, checkDoctorSlot, checkPatientSlot, getAppointments, getAppointmentsByDoctor };