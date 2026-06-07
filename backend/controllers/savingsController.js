const {
  addGoalsQuery,
  getGoalsQuery,
  addSavingsQuery,
  getAllSavingsQuery,
} = require("./queries/savingsQueries");
const { getTransactionsQuery } = require("./queries/transactionQueries");

const calculateSavingsTotal = async (userId) => {
  const earningTransactions = await getTransactionsQuery(userId, "Earnings");
  let earningsTotal = 0;

  for (let i = 0; i < earningTransactions.length; i++) {
    const { price } = earningTransactions[i];
    earningsTotal += price;
  }

  const expensesTransactions = await getTransactionsQuery(userId, "Expenses");
  let expensesTotal = 0;

  for (let i = 0; i < expensesTransactions.length; i++) {
    const { price } = expensesTransactions[i];
    expensesTotal += price;
  }

  let total = earningsTotal - expensesTotal;

  if (total <= 0) total = 0;

  return { total, earningsTotal, expensesTotal };
};

const trackSavings = async (user) => {
  const id = user.id;
  const username = user.username;

  const { total } = await calculateSavingsTotal(id);
  const date = new Date(Date.now()).toISOString().slice(0, 10);
  await addSavingsQuery(id, total, date);

  return { username, total, date };
};

const getTotalSavings = async (req, res) => {
  try {
    const id = req.user.id;
    const username = req.user.username;

    const { total } = await calculateSavingsTotal(id);

    return res.status(200).json({ savings: { username, total } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSavings = async (req, res) => {
  try {
    const id = req.user.id;

    const savings = await getAllSavingsQuery(id);

    return res.status(200).json({ savings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addGoals = async (req, res) => {
  try {
    const id = req.user.id;
    const { title, amount, status = false } = req.body;

    const goal = await addGoalsQuery(id, title, amount, status);

    res.status(200).json({ goal, message: "Goal added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGoals = async (req, res) => {
  try {
    const id = req.user.id;

    const goals = await getGoalsQuery(id);

    if (goals.length === 0) {
      return res.status(200).json({ goals });
    }

    res.status(200).json({ goals, message: "Successfuly fetch user goals." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTotalSavings,
  getAllSavings,
  trackSavings,
  addGoals,
  getGoals,
};
