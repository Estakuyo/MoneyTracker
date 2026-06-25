const {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  findCategory,
} = require("./queries/categoryQueries");

const {
  getTransactionsQuery,
  updateTransactionCategoryToNull,
} = require("./queries/transactionQueries");

const getTransactionCategories = async (req, res) => {
  try {
    const id = req.user.id;
    const type = req.query.type;

    const categories = await getAllCategory(id, type);

    if (categories.length === 0) {
      return res.status(200).json({ message: "No categories yet." });
    }

    return res.status(200).json({
      categories,
      message: "Successfully fetch user categories.",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTransactionsCategoryTotal = async (req, res) => {
  try {
    const id = req.user.id;
    const type = req.query.type;

    const categoryTotalAmount = await getTransactionsQuery(id, type);

    const categoryTotal = {};

    for (let i = 0; i < categoryTotalAmount.length; i++) {
      const { id, user_id, category_name, price } = categoryTotalAmount[i];

      let catName = category_name || "Uncategorized";

      if (!categoryTotal[catName]) {
        categoryTotal[catName] = {
          id,
          user_id,
          category_name: catName,
          total: 0,
        };
      }

      categoryTotal[catName].total += price;
    }

    const categoriesTotal = Object.values(categoryTotal);

    res.status(200).json({ categoriesTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCategoryController = async (req, res) => {
  try {
    const { name, type } = req.body;
    const user_id = req.user.id;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required." });
    }

    const existingCategory = await findCategory(user_id, name, type);
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }

    await addCategory(user_id, name, type);
    res.status(201).json({ message: "Category added successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const user_id = req.user.id;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required." });
    }

    const existingCategory = await findCategory(user_id, name, type);
    if (existingCategory && existingCategory.id !== parseInt(id)) {
      return res
        .status(400)
        .json({ message: "Category with same name and type already exists." });
    }

    const result = await updateCategory(name, type, id, user_id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or not owned by user." });
    }

    res.status(200).json({ message: "Category updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    await updateTransactionCategoryToNull(id, user_id);

    const result = await deleteCategory(id, user_id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or not owned by user." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransactionCategories,
  getTransactionsCategoryTotal,
  addCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
