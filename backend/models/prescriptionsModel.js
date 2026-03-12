const pool = require("../config/db");

const createPrescription = async (data) => {

  const query = `
  INSERT INTO prescriptions
  (record_id, medicine_name, dosage, duration)
  VALUES($1,$2,$3,$4)
  RETURNING *`;

  const values = [
    data.record_id,
    data.medicine_name,
    data.dosage,
    data.duration
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = { createPrescription };