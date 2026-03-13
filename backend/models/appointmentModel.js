const pool = require("../config/db");

/*
Create appointment
*/
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


/*
Check if doctor slot already booked
*/
const checkDoctorSlot = async (doctorId, appointmentTime) => {

  const query = `
    SELECT * FROM appointments
    WHERE doctor_id = $1
    AND appointment_time = $2
  `;

  const result = await pool.query(query, [
    doctorId,
    appointmentTime
  ]);

  return result.rows.length > 0;

};


/*
Get all appointments
*/
const getAppointments = async () => {

  const result = await pool.query(`
    SELECT 
      a.*,
      u.name AS patient_name,
      d.name AS doctor_name
    FROM appointments a
    JOIN users u ON a.patient_id = u.id
    JOIN doctors d ON a.doctor_id = d.id
    ORDER BY appointment_time
  `);

  return result.rows;
};


/*
Get doctor appointments
*/
const getAppointmentsByDoctor = async (doctorId) => {

  const result = await pool.query(
    `SELECT * 
     FROM appointments
     WHERE doctor_id=$1
     ORDER BY appointment_time`,
    [doctorId]
  );

  return result.rows;

};

module.exports = {
  createAppointment,
  checkDoctorSlot,
  getAppointments,
  getAppointmentsByDoctor
};