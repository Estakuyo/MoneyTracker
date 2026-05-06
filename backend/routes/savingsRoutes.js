const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getTotalSavings,
  addGoals,
  getGoals,
} = require("../controllers/savingsController");

router.get("/savings", authMiddleware, getTotalSavings);
router.post("/savings/:goalsId", authMiddleware, addGoals);
router.get("/savings", authMiddleware, getGoals);

module.exports = router;
