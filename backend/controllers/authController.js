const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender, phone, address, date_of_birth } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(name, email, hashedPassword, "PATIENT");

    await pool.query(
      "INSERT INTO patients(user_id, name, gender, phone, address, date_of_birth) VALUES($1,$2,$3,$4,$5,$6)",
      [user.id, user.name, gender || null, phone || null, address || null, date_of_birth || null]
    );

    delete user.password;

    res.status(201).json({ message: "Patient registered successfully", user });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login error" });
  }
};

module.exports = { registerUser, loginUser };