const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { 
  addCategoryController, 
  updateCategoryController, 
  deleteCategoryController 
} = require("../controllers/categoryController");

router.post("/categories", authMiddleware, addCategoryController);
router.put("/categories/:id", authMiddleware, updateCategoryController);
router.delete("/categories/:id", authMiddleware, deleteCategoryController);

module.exports = router;
