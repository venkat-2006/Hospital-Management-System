const express = require("express");
const router = express.Router();

const billController = require("../controllers/billController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// receptionist/admin create bill
router.post(
  "/",
  verifyToken,
  authorizeRoles("RECEPTIONIST", "ADMIN"),
  billController.createBill
);

// admin/receptionist see all bills
router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  billController.getAllBills
);

// patient/admin see bills by patient
router.get(
  "/patient/:patientId",
  verifyToken,
  authorizeRoles("PATIENT", "ADMIN", "RECEPTIONIST"),
  billController.getBillsByPatient
);

module.exports = router;