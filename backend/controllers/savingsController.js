const { addGoalsQuery } = require("./queries/savingsQueries");

const getTotalSavings = async (req, res) => {
  try {
    const id = req.user.id;
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTotalSavings, addGoals, getGoals };
