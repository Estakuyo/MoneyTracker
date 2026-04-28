const db = require("../../config/db_connection");

const getTransactionsQuery = async (user_id, type) => {
  const query = `
    SELECT 
        t.id,
        t.title,
        t.price,
        t.date,
        c.id AS category_id,
        c.name AS category_name,
        c.type,
        u.id as user_id,
        u.username
      FROM transactions t 
      INNER JOIN categories c ON t.category_id = c.id
      INNER JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ? AND type = ?`;
  const [rows] = await db.execute(query, [user_id, type]);
  return rows;
};

const addTransactionQuery = async (
  title,
  price,
  date,
  category_id,
  user_id,
) => {
  const query =
    "INSERT INTO transactions (title, price, date, category_id, user_id) VALUES (?, ?, ?, ?, ?)";
  const [result] = await db.execute(query, [
    title,
    price,
    date,
    category_id,
    user_id,
  ]);
  return result;
};

const updateTransactionQuery = async (title, price, id, user_id) => {
  const query =
    "UPDATE transactions SET title = ?, price = ?  WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [title, price, id, user_id]);
  return result;
};

const deleteTransactionQuery = async (id, user_id) => {
  const query = "DELETE FROM transactions WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, user_id]);
  return result;
};

module.exports = {
  getTransactionsQuery,
  addTransactionQuery,
  updateTransactionQuery,
  deleteTransactionQuery,
};
