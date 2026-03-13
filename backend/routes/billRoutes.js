const express = require("express");
const router = express.Router();

const billController = require("../controllers/billController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  verifyToken,
  authorizeRoles("RECEPTIONIST", "ADMIN"),
  billController.createBill
);

router.get(
  "/patient/:patientId",
  verifyToken,
  authorizeRoles("PATIENT", "ADMIN"),
  billController.getBillsByPatient
);

module.exports = router;