const db = require("../../config/db_connection");

const getSortClause = (sortOption) => {
  switch (sortOption) {
    case "highest":
      return " ORDER BY t.price DESC";
    case "lowest":
      return " ORDER BY t.price ASC";
    case "oldest":
      return " ORDER BY t.date ASC";
    case "latest":
    default:
      return " ORDER BY t.date DESC";
  }
};

const getTransactionsQuery = async (user_id, type, sortOption = "latest") => {
  const query =
    `
    SELECT 
        t.id,
        t.title,
        t.price,
        t.type,
        t.date,
        c.id AS category_id,
        IFNULL(c.name, 'Uncategorized') AS category_name,
        u.id as user_id,
        u.username
      FROM transactions t 
      LEFT JOIN categories c ON t.category_id = c.id
      INNER JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ? AND t.type = ?` + getSortClause(sortOption);
  const [rows] = await db.execute(query, [user_id, type]);
  return rows;
};

const getAllTransactionsQuery = async (user_id, sortOption = "latest") => {
  const query =
    `SELECT
      t.id,
      t.title,
      t.price,
      t.type,
      t.date
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ?` + getSortClause(sortOption);
  const [rows] = await db.execute(query, [user_id]);
  return rows;
};

const addTransactionQuery = async (
  title,
  price,
  type,
  date,
  category_id,
  user_id,
) => {
  const query =
    "INSERT INTO transactions (title, price, type, date, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)";
  const [result] = await db.execute(query, [
    title,
    price,
    type,
    date,
    category_id,
    user_id,
  ]);
  return result;
};

const updateTransactionQuery = async (title, price, category_id, id, user_id) => {
  const query =
    "UPDATE transactions SET title = ?, price = ?, category_id = ? WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [title, price, category_id, id, user_id]);
  return result;
};

const deleteTransactionQuery = async (id, user_id) => {
  const query = "DELETE FROM transactions WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, user_id]);
  return result;
};

const updateTransactionCategoryToNull = async (category_id, user_id) => {
  const query =
    "UPDATE transactions SET category_id = NULL WHERE category_id = ? AND user_id = ?";
  const [result] = await db.execute(query, [category_id, user_id]);
  return result;
};

module.exports = {
  getTransactionsQuery,
  getAllTransactionsQuery,
  addTransactionQuery,
  updateTransactionQuery,
  deleteTransactionQuery,
  updateTransactionCategoryToNull,
};
