const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

/*
Patient pays bill
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("PATIENT","ADMIN"),
  paymentController.createPayment
);

/*
View payments for bill
*/
router.get(
  "/bill/:billId",
  verifyToken,
  authorizeRoles("ADMIN","PATIENT","RECEPTIONIST"),
  paymentController.getPaymentsByBill
);

module.exports = router;