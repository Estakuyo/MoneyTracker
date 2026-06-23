const earningsApi = {
  getEarnings: (sort) => `/transaction?type=Earnings&sort=${sort}`,
  getEarningsTotal: "/transaction/total?type=Earnings",
  getEarningCategories: "/transaction/categories?type=Earnings",
  getEarningsCategoryTotal: "/transaction/categories/total?type=Earnings",
  addEarning: "/transaction",
  updateEarning: "/transaction/:transactionId",
  deleteEarning: "/transaction/:transactionId",
};

export default earningsApi;
