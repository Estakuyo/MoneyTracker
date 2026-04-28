const {
  getTransactionsQuery,
  addTransactionQuery,
  updateTransactionQuery,
  deleteTransactionQuery,
} = require("./queries/transactionQueries");

const { findCategory, addCategory } = require("./queries/categoryQueries");

const getTransactions = async (req, res) => {
  try {
    const id = req.user.id;
    const type = req.query.type;

    const earnings = await getTransactionsQuery(id, type);

    if (earnings.length === 0) {
      return res.status(200).json({ message: "No earnings yet." });
    }

    return res
      .status(200)
      .json({ earnings, message: "Successfully fetch user transactions." });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addTransaction = async (req, res) => {
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
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const earnings = await addTransactionQuery(
      title,
      price,
      date,
      categoryId,
      id,
    );

    res.status(200).json({
      earnings,
      message: "Earning added successfully.",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const id = req.user.id;
    const transactionId = req.params.transactionId;
    const { title, price } = req.body;

    const earning = await updateTransactionQuery(
      title,
      price,
      transactionId,
      id,
    );

    return res.status(200).json({
      earning,
      message: "Earning updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.user.id;
    const transactionId = req.params.transactionId;

    const earning = await deleteTransactionQuery(transactionId, id);

    return res
      .status(200)
      .json({ earning, message: "Earning deleted successfully." });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
