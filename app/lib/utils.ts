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
