const pool = require("../config/db");

const createPatient = async (data) => {
  const query = `
    INSERT INTO patients(name, gender, phone, address, date_of_birth)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`;

  const values = [
    data.name,
    data.gender,
    data.phone,
    data.address,
    data.date_of_birth
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getPatients = async () => {
  const result = await pool.query("SELECT * FROM patients");
  return result.rows;
};

module.exports = {
  createPatient,
  getPatients
};