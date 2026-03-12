const pool = require("../config/db");

const createMedicine = async (data) => {

  const query = `
  INSERT INTO medicines(name, stock, price, expiry_date)
  VALUES ($1,$2,$3,$4)
  RETURNING *`;

  const values = [
    data.name,
    data.stock,
    data.price,
    data.expiry_date
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getMedicines = async () => {

  const result = await pool.query("SELECT * FROM medicines");

  return result.rows;
};

module.exports = {
  createMedicine,
  getMedicines
};