const createBill = async (data) => {

  const query = `
  INSERT INTO bills(patient_id, total_amount, status)
  VALUES($1,$2,$3)
  RETURNING *`;

  const values = [
    data.patient_id,
    data.total_amount,
    data.status
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};