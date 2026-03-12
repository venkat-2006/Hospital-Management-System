const pool = require("../config/db");

const createDoctor = async (data) => {
  const query = `
  INSERT INTO doctors(name, specialization, experience, phone)
  VALUES($1,$2,$3,$4)
  RETURNING *`;

  const values = [
    data.name,
    data.specialization,
    data.experience,
    data.phone
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getDoctors = async () => {
  const result = await pool.query("SELECT * FROM doctors");
  return result.rows;
};

module.exports = {
  createDoctor,
  getDoctors
};