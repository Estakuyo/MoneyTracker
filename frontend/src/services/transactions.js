import transactionApi from "../api/transactionsApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllUserTransactions = async ({ token }) => {
  const res = await fetch(backendUrl + transactionApi.getAllTransactions, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get transactions");
  }

  return data;
};
