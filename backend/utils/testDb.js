const pool = require("../config/db");

async function testDatabase() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected successfully!");
    console.log(result.rows);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

testDatabase();