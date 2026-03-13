const pool = require("../config/db");
const bcrypt = require("bcrypt");

const seedAdmin = async () => {

  try {

    const email = process.env.ADMIN_EMAIL;

    const existingAdmin = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingAdmin.rows.length > 0) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await pool.query(
      `INSERT INTO users (name,email,password,role)
       VALUES ($1,$2,$3,'ADMIN')`,
      [
        process.env.ADMIN_NAME,
        process.env.ADMIN_EMAIL,
        hashedPassword
      ]
    );

    console.log("Admin account created");

  } catch (error) {
    console.error("Admin seeding failed:", error);
  }

};

module.exports = seedAdmin;