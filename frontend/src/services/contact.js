import contactApi from "../api/contactApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const sendContactMessage = async ({ email, message }) => {
  const res = await fetch(backendUrl + contactApi.sendContactMessage, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, message }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Failed to send message");
  }

  return data;
};
