const pool = require("../config/db");

const createAppointment = async (data) => {

  const query = `
    INSERT INTO appointments
    (request_id, patient_id, doctor_id, appointment_time)
    VALUES ($1,$2,$3,$4)
    RETURNING *`;

  const values = [
    data.request_id,
    data.patient_id,
    data.doctor_id,
    data.appointment_time
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAppointments = async () => {

  const result = await pool.query(`
    SELECT a.*, p.name AS patient_name, d.name AS doctor_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
    ORDER BY appointment_time
  `);

  return result.rows;
};

const getAppointmentsByDoctor = async (doctorId) => {

  const result = await pool.query(
    "SELECT * FROM appointments WHERE doctor_id=$1",
    [doctorId]
  );

  return result.rows;
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentsByDoctor
};