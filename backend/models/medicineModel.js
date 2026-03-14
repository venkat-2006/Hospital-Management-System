const pool = require("../config/db");

const createMedicine = async (data) => {
  const result = await pool.query(
    `INSERT INTO medicines(name, stock, price, expiry_date)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [data.name, data.stock, data.price, data.expiry_date]
  );
  return result.rows[0];
};

const getMedicines = async () => {
  const result = await pool.query("SELECT * FROM medicines ORDER BY name");
  return result.rows;
};

const updateStock = async (id, stock) => {
  const result = await pool.query(
    `UPDATE medicines SET stock=$1 WHERE id=$2 RETURNING *`,
    [stock, id]
  );
  return result.rows[0];
};

const deductStock = async (medicineName, quantity = 1) => {
  const result = await pool.query(
    `UPDATE medicines 
     SET stock = stock - $1 
     WHERE name = $2 AND stock >= $1
     RETURNING *`,
    [quantity, medicineName]
  );
  return result.rows[0];
};

module.exports = { createMedicine, getMedicines, updateStock, deductStock };