require("dotenv").config();

const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const recordRoutes = require("./routes/recordRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const labRoutes = require("./routes/labRoutes");
const billRoutes = require("./routes/billRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes =require("./routes/doctorRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);
app.use("/auth", authRoutes);

app.use("/payments", paymentRoutes);

app.use("/records", recordRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/medicines", medicineRoutes);
app.use("/lab-reports", labRoutes);
app.use("/bills", billRoutes);
app.use("/requests", requestRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/doctor",doctorRoutes);


app.get("/", (req, res) => {
  res.send("Hospital Management System API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});