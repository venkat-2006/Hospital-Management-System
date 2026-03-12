const express = require("express");
const router = express.Router();

const billController = require("../controllers/billController");

router.post("/", billController.createBill);
router.get("/:patientId", billController.getBillsByPatient);

module.exports = router;