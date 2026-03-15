const express           = require("express");
const router            = express.Router();
const paymentController = require("../controllers/paymentController");
const verifyToken       = require("../middleware/authMiddleware");
const authorizeRoles    = require("../middleware/roleMiddleware");

// Process payment — receptionist/admin only
router.post(
  "/",
  verifyToken,
  authorizeRoles("RECEPTIONIST", "ADMIN"),
  paymentController.createPayment
);

// Get receipt by payment id — must be BEFORE /bill/:billId
router.get(
  "/:paymentId/receipt",
  verifyToken,
  authorizeRoles("ADMIN", "RECEPTIONIST", "PATIENT"),
  paymentController.getReceipt
);

// View payments for a bill
router.get(
  "/bill/:billId",
  verifyToken,
  authorizeRoles("ADMIN", "RECEPTIONIST", "PATIENT"),
  paymentController.getPaymentsByBill
);

module.exports = router;