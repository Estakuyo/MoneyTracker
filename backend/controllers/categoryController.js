const { addCategory, getAllCategory } = require("./queries/categoryQueries");

const { getTransactionsQuery } = require("./queries/transactionQueries");

const getEarningCategories = async (req, res) => {
  try {
    const id = req.user.id;
    const type = req.query.type;

    const categories = await getAllCategory(id, type);

    if (categories.length === 0) {
      return res.status(200).json({ message: "No earning categories yet." });
    }

    return res.status(200).json({
      categories,
      message: "Successfully fetch user earning categories.",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getEarningsCategoryTotal = async (req, res) => {
  try {
    const id = req.user.id;
    const type = req.query.type;

    const categoryTotalAmount = await getTransactionsQuery(id, type);

    const categoryTotal = categoryTotalAmount.reduce((acc, transaction) => {
      const { id, user_id, category_name, price } = transaction;

      if (!acc[category_name]) {
        acc[category_name] = { id, user_id, category_name, total: 0 };
      }

      acc[category_name].total += price;

      return acc;
    }, {});

    const categoriesTotal = Object.values(categoryTotal);

    res.status(200).json({ categoriesTotal });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getEarningCategories, getEarningsCategoryTotal };
