const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getEarnings,
  getEarningCategories,
  addEarnings,
  updateEarnings,
  deleteEarnings,
} = require("../controllers/earningsController");

router.get("/earnings", authMiddleware, getEarnings);
router.get("/earnings/categories", authMiddleware, getEarningCategories);
router.post("/earnings", authMiddleware, addEarnings);
router.put("/earnings/:transactionId", authMiddleware, updateEarnings);
router.delete("/earnings/:transactionId", authMiddleware, deleteEarnings);

module.exports = router;
