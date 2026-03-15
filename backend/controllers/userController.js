const bcrypt = require("bcrypt");
const pool = require("../config/db"); //  Fix: import pool here
const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, specialization, experience, phone } = req.body; // ✅ extract extra fields

    if (role === "ADMIN") {
      return res.status(403).json({ message: "Cannot create admin" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(name, email, hashedPassword, role);
if (role === "DOCTOR") {
  await pool.query(
    "INSERT INTO doctors(user_id, name, specialization, experience, phone) VALUES($1, $2, $3, $4, $5)",
    [user.id, user.name, specialization, experience, phone]
  );
}
    delete user.password;

    res.json({ message: "User created successfully", user });

  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const getUsers = async (req, res) => {
  try { //  Fix: added try/catch
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try { //  Fix: added try/catch
    await userModel.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { createUser, getUsers, deleteUser };