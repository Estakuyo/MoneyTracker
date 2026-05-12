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

    const transactions = await getTransactionsQuery(id, type);

    if (transactions.length === 0) {
      return res.status(200).json({ message: "No transactions yet." });
    }

    return res
      .status(200)
      .json({ transactions, message: "Successfully fetch user transactions." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionTotalAmount = async (req, res) => {
  try {
    const id = req.user.id;
    const type = req.query.type;

    const transactionTotalAmount = await getTransactionsQuery(id, type);

    const transactionTotal = {};

    for (let i = 0; i < transactionTotalAmount.length; i++) {
      const { user_id, username, type, price } = transactionTotalAmount[i];

      if (!transactionTotal[type]) {
        transactionTotal[type] = { user_id, username, type, total: 0 };
      }

      transactionTotal[type].total += price;
    }

    const transactionsTotal = Object.values(transactionTotal);

    res.status(200).json({ transactionsTotal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTransaction = async (req, res) => {
  try {
    const id = req.user.id;
    const { title, price, category, type } = req.body;

    // IMPORTANT NOTE: type is being declared in frontend services

    const existingCategory = await findCategory(id, category, type);

    let categoryId;

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await addCategory(id, category, type);
      categoryId = newCategory.insertId;
    }
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const transactions = await addTransactionQuery(
      title,
      price,
      date,
      categoryId,
      id,
    );

    res.status(200).json({
      transactions,
      message: "Transaction added successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      message: "Transaction updated successfully.",
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
      .json({ earning, message: "Transaction deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  getTransactionTotalAmount,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
