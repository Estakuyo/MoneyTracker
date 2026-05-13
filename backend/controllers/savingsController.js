const { addGoalsQuery, getGoalsQuery } = require("./queries/savingsQueries");
const { getTransactionsQuery } = require("./queries/transactionQueries");

const getTotalSavings = async (req, res) => {
  try {
    const id = req.user.id;
    const username = req.user.username;

    const earningTransactions = await getTransactionsQuery(
      id,
      (type = "Earnings"),
    );
    let earningsTotal = 0;

    for (let i = 0; i < earningTransactions.length; i++) {
      const { type, price } = earningTransactions[i];
      earningsTotal += price;
    }

    const expensesTransactions = await getTransactionsQuery(
      id,
      (type = "Expenses"),
    );
    let expensesTotal = 0;

    for (let i = 0; i < expensesTransactions.length; i++) {
      const { type, price } = expensesTransactions[i];
      expensesTotal += price;
    }

    let total;

    if (earningsTotal > expensesTotal) {
      total = earningsTotal - expensesTotal;
    }
    if (earningsTotal < expensesTotal) {
      total = expensesTotal - earningsTotal;
    }

    const savings = { username, total };

    res.status(200).json({ savings });
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
      return res.status(200).json({ message: "No goals yet." });
    }

    res.status(200).json({ goals, message: "Successfuly fetch user goals." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTotalSavings, addGoals, getGoals };
