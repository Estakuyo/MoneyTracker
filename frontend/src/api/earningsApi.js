const earningsApi = {
  getEarnings: "/earnings",
  getEarningCategories: "/earnings/categories",
  getEarningsCategoryTotal: "/earnings/categories/total",
  addEarning: "/earnings",
  updateEarning: "/earnings/:transactionId",
  deleteEarning: "/earnings/:transactionId",
};

export default earningsApi;
