const db = require("../../config/db_connection");

const getEarningsQuery = async (user_id) => {
  const query = `
    SELECT 
        t.id,
        t.title,
        t.price,
        c.id AS category_id,
        c.name AS category_name,
        c.type,
        u.username
      FROM transactions t 
      INNER JOIN categories c ON t.category_id = c.id
      INNER JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ?`;
  const [rows] = await db.execute(query, [user_id]);
  return rows;
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

const updateTransaction = async (title, price, id, user_id) => {
  const query =
    "UPDATE transactions SET title = ?, price = ?  WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [title, price, id, user_id]);
  return result;
};

const deleteTransaction = async (id, user_id) => {
  const query = "DELETE FROM transactions WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, user_id]);
  return result;
};

const findCategory = async (user_id, name, type) => {
  const query =
    "SELECT * FROM categories WHERE user_id = ? AND name = ? AND type = ?";
  const [rows] = await db.execute(query, [user_id, name, type]);
  return rows[0];
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

// const deleteCategory = async (id, user_id) => {
//   const query = "DELETE FROM categories WHERE id = ? AND user_id = ?";
//   const [result] = await db.execute(query, [id, user_id]);
//   return result;
// };

module.exports = {
  getEarningsQuery,
  findCategory,
  addTransaction,
  addCategory,
  updateTransaction,
  updateCategory,
  deleteTransaction,
};
