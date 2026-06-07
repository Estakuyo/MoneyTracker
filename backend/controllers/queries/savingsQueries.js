const db = require("../../config/db_connection");

const addGoalsQuery = async (user_id, title, amount, status) => {
  const query = `INSERT INTO goals (user_id, title, amount, status) VALUES (?, ?, ?, ?)`;
  const [result] = await db.execute(query, [user_id, title, amount, status]);
  return result;
};

const getGoalsQuery = async (user_id) => {
  const query = `SELECT * FROM goals WHERE user_id = ?`;
  const [rows] = await db.execute(query, [user_id]);
  return rows;
};

const addSavingsQuery = async (user_id, amount, date) => {
  const query = `INSERT INTO savings (user_id, amount, date) VALUES (?, ?, ?)`;
  const [result] = await db.execute(query, [user_id, amount, date]);
  return result;
};

const getAllSavingsQuery = async (user_id) => {
  const query = `SELECT * FROM savings WHERE user_id = ?`;
  const [rows] = await db.execute(query, [user_id]);
  return rows;
};

const updateGoalStatusQuery = async (goal_id) => {
  const query = `UPDATE goals SET status = TRUE WHERE id = ?`;
  const [result] = await db.execute(query, [goal_id]);
  return result;
};

module.exports = {
  addGoalsQuery,
  getGoalsQuery,
  addSavingsQuery,
  getAllSavingsQuery,
  updateGoalStatusQuery,
};
