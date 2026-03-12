const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post("/", paymentController.createPayment);

router.get("/:billId", paymentController.getPaymentsByBill);

module.exports = router;