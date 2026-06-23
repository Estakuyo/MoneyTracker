import expensesApi from "../api/expensesApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const add_Expenses = async ({ title, price, category, token }) => {
  const res = await fetch(backendUrl + expensesApi.addExpenses, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, price, category, type: "Expenses" }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to add Expense");
  }

  return data;
};

export const getExpenses = async ({ token, sort }) => {
  const res = await fetch(backendUrl + expensesApi.getExpenses(sort), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get Expense");
  }

  return data;
};

export const getExpensesTotal = async ({ token }) => {
  const res = await fetch(backendUrl + expensesApi.getExpensesTotal, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get Expenses total");
  }

  return data;
};

export const get_ExpenseCategories = async ({ token }) => {
  const res = await fetch(backendUrl + expensesApi.getExpenseCategories, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get Expense categories");
  }

  return data;
};

export const get_ExpensesCategoryTotal = async ({ token }) => {
  const res = await fetch(backendUrl + expensesApi.getExpensesCategoryTotal, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get category's total amounts");
  }

  return data;
};

export const updateExpense = async ({ transactionId, title, price, token }) => {
  const endpoint = expensesApi.updateExpense.replace(
    ":transactionId",
    transactionId,
  );

  const res = await fetch(backendUrl + endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, price }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to update Expense");
  }

  return data;
};

export const deleteExpense = async ({ transactionId, token }) => {
  const endpoint = expensesApi.deleteExpense.replace(
    ":transactionId",
    transactionId,
  );

  const res = await fetch(backendUrl + endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to delete Expense");
  }

  return data;
};
