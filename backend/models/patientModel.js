const pool = require("../config/db");

const getPatients = async () => {
  const result = await pool.query("SELECT * FROM patients");
  return result.rows;
};

module.exports = {
  getPatients,
};