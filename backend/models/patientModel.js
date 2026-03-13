const pool = require("../config/db");

const createPatient = async (data) => {
  const result = await pool.query(
    "INSERT INTO patients(user_id, name, gender, phone, address, date_of_birth) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [data.user_id, data.name, data.gender, data.phone, data.address, data.date_of_birth]
  );
  return result.rows[0];
};

const getPatients = async () => {
  const result = await pool.query("SELECT * FROM patients");
  return result.rows;
};

module.exports = { createPatient, getPatients };