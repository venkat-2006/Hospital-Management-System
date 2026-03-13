const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  userController.createUser
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("ADMIN"),
  userController.getUsers
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  userController.deleteUser
);

module.exports = router;