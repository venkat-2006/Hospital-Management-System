const getMedicines = async () => {
  const result = await pool.query("SELECT * FROM medicines");
  return result.rows;
};