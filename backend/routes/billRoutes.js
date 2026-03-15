const express        = require("express");
const router         = express.Router();
const billController = require("../controllers/billController");
const verifyToken    = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  verifyToken, authorizeRoles("RECEPTIONIST", "ADMIN"),
  billController.createBill
);

router.get(
  "/",
  verifyToken, authorizeRoles("ADMIN", "RECEPTIONIST"),
  billController.getAllBills
);

// /patient/:patientId must be BEFORE /:billId
router.get(
  "/patient/:patientId",
  verifyToken, authorizeRoles("PATIENT", "ADMIN", "RECEPTIONIST"),
  billController.getBillsByPatient
);

router.patch(
  "/:billId",
  verifyToken, authorizeRoles("ADMIN", "RECEPTIONIST"),
  billController.updateBillStatus
);

module.exports = router;