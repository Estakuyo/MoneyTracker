const db = require("../../config/db_connection");

const findCategory = async (user_id, name, type) => {
  const query =
    "SELECT * FROM categories WHERE user_id = ? AND name = ? AND type = ?";
  const [rows] = await db.execute(query, [user_id, name, type]);
  return rows[0];
};

const getAllCategory = async (user_id) => {
  const query = "SELECT * FROM categories WHERE user_id = ?";
  const [rows] = await db.execute(query, [user_id]);
  return rows;
};

const addCategory = async (user_id, name, type) => {
  const query = "INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)";
  const [result] = await db.execute(query, [user_id, name, type]);
  return result;
};

const updateCategory = async (name, type, id, user_id) => {
  const query =
    "UPDATE categories SET name = ?, type = ? WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [name, type, id, user_id]);
  return result;
};

const deleteCategory = async (id, user_id) => {
  const query = "DELETE FROM categories WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, user_id]);
  return result;
};

module.exports = {
  findCategory,
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
