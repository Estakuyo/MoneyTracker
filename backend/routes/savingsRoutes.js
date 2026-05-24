const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getTotalSavings,
  getAllSavings,
  addGoals,
  getGoals,
} = require("../controllers/savingsController");

router.get("/savings", authMiddleware, getTotalSavings);
router.get("/savings/all", authMiddleware, getAllSavings);
router.post("/savings/goals", authMiddleware, addGoals);
router.get("/savings/goals", authMiddleware, getGoals);

module.exports = router;
