require("dotenv").config();

const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);

app.get("/", (req, res) => {
  res.send("Hospital Management System API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});