const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getEarnings,
  addEarnings,
  updateEarnings,
  deleteEarnings,
} = require("../controllers/earningsController");

router.get("/earnings", authMiddleware, getEarnings);
router.post("/earnings", authMiddleware, addEarnings);
router.put("/earnings/:transactionId", authMiddleware, updateEarnings);
router.delete("/earnings/:transactionId", authMiddleware, deleteEarnings);

module.exports = router;
