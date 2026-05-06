const getTotalSavings = async (req, res) => {
  try {
    const id = req.user.id;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addGoals = async (req, res) => {
  const id = req.user.id;
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGoals = async (req, res) => {
  const id = req.user.id;
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTotalSavings, addGoals, getGoals };
