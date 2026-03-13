const pool = require("../config/db");

const createUser = async (name, email, password, role) => {
  const query =
    "INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *";
  const values = [name, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
};

module.exports = { createUser, findUserByEmail, getUsers, deleteUser };