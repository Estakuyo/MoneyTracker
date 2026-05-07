const db = require("../../config/db_connection");

const addGoalsQuery = async (user_id, title, amount, status) => {
  const query = `INSERT INTO goals (user_id, title, amount, status) VALUES (?, ?, ?, ?)`;
  const [result] = await db.execute(query, [user_id, title, amount, status]);
  return result;
};

module.exports = { addGoalsQuery };
