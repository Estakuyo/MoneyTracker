const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getTransactions,
  getTransactionTotalAmount,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const {
  getEarningCategories,
  getEarningsCategoryTotal,
} = require("../controllers/categoryController");

router.get("/transaction", authMiddleware, getTransactions);
router.get("/transaction/total", authMiddleware, getTransactionTotalAmount);
router.get("/transaction/categories", authMiddleware, getEarningCategories);
router.get(
  "/transaction/categories/total",
  authMiddleware,
  getEarningsCategoryTotal,
);
router.post("/transaction", authMiddleware, addTransaction);
router.put("/transaction/:transactionId", authMiddleware, updateTransaction);
router.delete("/transaction/:transactionId", authMiddleware, deleteTransaction);

module.exports = router;
