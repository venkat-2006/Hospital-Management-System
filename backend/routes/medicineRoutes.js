const express = require("express");
const router = express.Router();

const medicineController = require("../controllers/medicineController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  medicineController.createMedicine
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN", "DOCTOR"),  // DOCTOR here
  medicineController.getMedicines
);

router.patch(
  "/:id/stock",
  verifyToken,
  authorizeRoles("ADMIN"),
  medicineController.updateStock
);

module.exports = router;