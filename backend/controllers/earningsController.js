const {
  getTransactionsQuery,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("./queries/transactionQueries");

const {
  findCategory,
  addCategory,
  getAllCategory,
} = require("./queries/categoryQueries");

const getEarnings = async (req, res) => {
  try {
    const id = req.user.id;

    const earnings = await getTransactionsQuery(id, (type = "Earnings"));

    if (earnings.length === 0) {
      return res.status(200).json({ message: "No earnings yet." });
    }

    return res
      .status(200)
      .json({ earnings, message: "Successfully fetch user earnings." });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getEarningCategories = async (req, res) => {
  try {
    const id = req.user.id;

    const categories = await getAllCategory(id, (type = "Earnings"));

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

    const categoryTotalAmount = await getTransactionsQuery(
      id,
      (type = "Earnings"),
    );

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

const addEarnings = async (req, res) => {
  try {
    const id = req.user.id;
    const { title, price, category } = req.body;

    const existingCategory = await findCategory(
      id,
      category,
      (type = "Earnings"),
    );

    let categoryId;

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await addCategory(id, category, (type = "Earnings"));
      categoryId = newCategory.insertId;
    }
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const earnings = await addTransaction(title, price, date, categoryId, id);

    res.status(200).json({
      earnings,
      message: "Earning added successfully.",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateEarnings = async (req, res) => {
  try {
    const id = req.user.id;
    const transactionId = req.params.transactionId;
    const { title, price } = req.body;

    const earning = await updateTransaction(title, price, transactionId, id);

    return res.status(200).json({
      earning,
      message: "Earning updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteEarnings = async (req, res) => {
  try {
    const id = req.user.id;
    const transactionId = req.params.transactionId;

    const earning = await deleteTransaction(transactionId, id);

    return res
      .status(200)
      .json({ earning, message: "Earning deleted successfully." });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getEarnings,
  getEarningCategories,
  getEarningsCategoryTotal,
  addEarnings,
  updateEarnings,
  deleteEarnings,
};
