import savingsApi from "../api/savingsApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getUserSavings = async ({ token }) => {
  const res = await fetch(backendUrl + savingsApi.getSavings, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get Savings");
  }

  return data;
};

export const getAllUserSavings = async ({ token }) => {
  const res = await fetch(backendUrl + savingsApi.getAllSavings, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get all Savings");
  }

  return data;
};

export const addUserGoal = async ({ title, amount, token }) => {
  const res = await fetch(backendUrl + savingsApi.addGoal, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, amount }),
  });
  const data = res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to add Goal");
  }

  return data;
};

export const getUserGoals = async ({ token }) => {
  const res = await fetch(backendUrl + savingsApi.getGoal, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to get Goals");
  }

  return data;
};
