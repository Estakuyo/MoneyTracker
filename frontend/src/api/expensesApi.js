const expensesApi = {
  getExpenses: "/transaction?type=Expenses",
  getExpensesTotal: "/transaction/total?type=Expenses",
  getExpenseCategories: "/transaction/categories?type=Expenses",
  getExpensesCategoryTotal: "/transaction/categories/total?type=Expenses",
  addExpenses: "/transaction",
  updateExpense: "/transaction/:transactionId",
  deleteExpense: "/transaction/:transactionId",
};

export default expensesApi;
