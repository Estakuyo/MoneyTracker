const {
  getEarningsQuery,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  addCategory,
  updateCategory,
} = require("./queries/earningsQueries");

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

    const earningCategory = await addCategory(id, category, type);
    const earnings = await addTransaction(
      title,
      price,
      earningCategory.insertId,
      id,
    );

    res.status(200).json({
      earnings,
      earningCategory,
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
    const { title, price, categoryId, category, type } = req.body;

    const earningCategory = await updateCategory(
      category,
      type,
      categoryId,
      id,
    );
    const earning = await updateTransaction(title, price, transactionId, id);

    return res.status(200).json({
      earning,
      earningCategory,
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
