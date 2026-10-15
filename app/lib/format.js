const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatCurrency = (value) => currency.format(value || 0);

export const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value || 0);

export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })
    : "-";

// Percentage change between two periods; null when there is no previous value to compare to.
export const percentChange = (current, previous) => {
  if (!previous) return null;
  return Math.round(((current - previous) / previous) * 100);
};

export const capitalize = (value = "") => value.charAt(0).toUpperCase() + value.slice(1);
