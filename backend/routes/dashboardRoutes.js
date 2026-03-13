const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

/*
Admin dashboard
*/
router.get(
  "/admin",
  verifyToken,
  authorizeRoles("ADMIN"),
  dashboardController.getAdminStats
);

/*
Doctor dashboard
*/
router.get(
  "/doctor",
  verifyToken,
  authorizeRoles("DOCTOR"),
  dashboardController.getDoctorStats
);

/*
Receptionist dashboard
*/
router.get(
  "/reception",
  verifyToken,
  authorizeRoles("RECEPTIONIST"),
  dashboardController.getReceptionStats
);

/*
Lab technician dashboard
*/
router.get(
  "/lab",
  verifyToken,
  authorizeRoles("LAB_TECH"),
  dashboardController.getLabStats
);

module.exports = router;