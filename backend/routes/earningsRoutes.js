const express = require("express");
const router = express.Router();

const {
  getEarnings,
  addEarnings,
  updateEarnings,
  deleteEarnings,
} = require("../controllers/earningsController");

router.get("/earnings", getEarnings);
router.post("/earnings", addEarnings);
router.put("/earnings", updateEarnings);
router.delete("/earnings", deleteEarnings);

module.exports = router;
