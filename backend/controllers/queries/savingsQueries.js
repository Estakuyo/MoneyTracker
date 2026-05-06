const db = require("../../config/db_connection");

const addGoalsQuery = async (user_id) => {
  const [query] = ``;
  const [result] = await db.execute(query, [user_id]);
  return result;
};
