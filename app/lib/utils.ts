import { Revenue } from "./definitions";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "fr-FR",
) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Date(dateStr).toLocaleDateString(locale, options);
};

export const generateYAxis = (data: Revenue[]) => {
  const yAxisLabels = [];
  const topLabel = Math.max(...data.map((revenue) => revenue.revenue)) + 1000;
  for (let i = 0; i < topLabel; i += 1000) {
    yAxisLabels.push(i);
  }
  return { yAxisLabels, topLabel };
};

export const generatePagination = (
  currentPage: number,
  totalPages: number,
) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
