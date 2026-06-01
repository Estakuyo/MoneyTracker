const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getAllTransactions } = require("../controllers/transactionController");

router.get("/transactions/all", getAllTransactions);

module.exports = router;
