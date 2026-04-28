import earningsApi from "../api/earningsApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const add_Earning = async ({ title, price, category, token }) => {
  const res = await fetch(backendUrl + earningsApi.addEarning, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, price, category }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to add earning");
  }

  return data;
};

export const getEarnings = async ({ token }) => {
  const res = await fetch(backendUrl + earningsApi.getEarnings, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get earning");
  }

  return data;
};

export const get_EarningCategories = async ({ token }) => {
  const res = await fetch(backendUrl + earningsApi.getEarningCategories, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get earning categories");
  }

  return data;
};

export const get_EarningsCategoryTotal = async ({ token }) => {
  const res = await fetch(backendUrl + earningsApi.getEarningsCategoryTotal, {
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

export const updateEarning = async ({ transactionId, title, price, token }) => {
  const endpoint = earningsApi.updateEarning.replace(
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
    throw new Error(data?.error || "Failed to update earning");
  }

  return data;
};

export const deleteEarning = async ({ transactionId, token }) => {
  const endpoint = earningsApi.deleteEarning.replace(
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
    throw new Error(data?.error || "Failed to delete earning");
  }

  return data;
};
