export const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-PH");
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
