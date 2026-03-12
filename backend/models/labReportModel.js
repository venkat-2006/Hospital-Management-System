const createLabReport = async (data) => {

  const query = `
  INSERT INTO lab_reports
  (patient_id, doctor_id, test_type, result)
  VALUES($1,$2,$3,$4)
  RETURNING *`;

  const values = [
    data.patient_id,
    data.doctor_id,
    data.test_type,
    data.result
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};