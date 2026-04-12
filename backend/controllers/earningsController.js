const {
  getEarningsQuery,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("./queries/earningsQueries");

const { findCategory, addCategory } = require("./queries/categoryQueries");

const getEarnings = async (req, res) => {
  try {
    const id = req.user.id;

    const earnings = await getEarningsQuery(id);
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

const addEarnings = async (req, res) => {
  try {
    const id = req.user.id;
    const { title, price, category, type } = req.body;

    const existingCategory = await findCategory(id, category, type);
    let categoryId;
    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await addCategory(id, category, type);
      categoryId = newCategory.insertId;
    }

    const earnings = await addTransaction(title, price, categoryId, id);

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

module.exports = { getEarnings, addEarnings, updateEarnings, deleteEarnings };
