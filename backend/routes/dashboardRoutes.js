const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/admin",
  verifyToken,
  authorizeRoles("ADMIN"),
  dashboardController.getAdminDashboard
);

router.get(
  "/doctor",
  verifyToken,
  authorizeRoles("DOCTOR"),
  dashboardController.getDoctorDashboard
);

router.get(
  "/reception",
  verifyToken,
  authorizeRoles("RECEPTIONIST"),
  dashboardController.getReceptionDashboard
);

router.get(
  "/lab",
  verifyToken,
  authorizeRoles("LAB_TECH"),
  dashboardController.getLabDashboard
);

module.exports = router;