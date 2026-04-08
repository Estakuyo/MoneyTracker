const db = require("../../config/db_connection");

const getEarnings = async () => {
  const query = "SELECT";
};

const addTransaction = async (title, price, category_id, user_id) => {
  const query =
    "INSERT INTO transactions (title, price, category_id, user_id) VALUES (?, ?, ?, ?)";
  const [result] = await db.execute(query, [
    title,
    price,
    category_id,
    user_id,
  ]);
  return result;
};

const addCategory = async (user_id, name, type) => {
  const query = "INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)";
  const [result] = await db.execute(query, [user_id, name, type]);
  return result;
};

const updateTransaction = async (title, price, category_id, id, user_id) => {
  const query =
    "UPDATE transactions SET title = ?, price = ?, category_id = ?  WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [
    title,
    price,
    category_id,
    id,
    user_id,
  ]);
  return result;
};

const updateCategory = async (name, type, id, user_id) => {
  const query =
    "UPDATE categories SET name = ?, type = ? WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [name, type, id, user_id]);
  return result;
};

const deleteTransaction = async (id, user_id) => {
  const query = "DELETE FROM transactions WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, user_id]);
  return result;
};

const deleteCategory = async (id, user_id) => {
  const query = "DELETE FROM categories WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, user_id]);
  return result;
};

module.exports = {
  addTransaction,
  addCategory,
  updateTransaction,
  updateCategory,
  deleteTransaction,
  deleteCategory,
};
