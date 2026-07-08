const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function formatUSD(value: number) {
  const amount = Math.abs(value);
  const formatted = usdFormatter.format(amount).replace(/^\$/, "").trim();
  return `${value < 0 ? "−" : ""}$\u2009${formatted}`;
}
