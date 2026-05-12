const { addCategory, getAllCategory } = require("./queries/categoryQueries");

const { getTransactionsQuery } = require("./queries/transactionQueries");

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

      if (!categoryTotal[category_name]) {
        categoryTotal[category_name] = { id, user_id, category_name, total: 0 };
      }

      categoryTotal[category_name].total += price;
    }

    const categoriesTotal = Object.values(categoryTotal);

    res.status(200).json({ categoriesTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTransactionCategories, getTransactionsCategoryTotal };
