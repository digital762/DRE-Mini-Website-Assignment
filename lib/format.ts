export function formatAED(value: number): string {
  return `AED ${Math.round(value).toLocaleString("en-US")}`;
}

export function formatAEDCompact(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const rounded = Math.round(millions * 10) / 10;
    return `AED ${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const thousands = Math.round(value / 1000);
    return `AED ${thousands}K`;
  }
  return formatAED(value);
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

export function formatPricePerSqft(price: number, sqft: number): string {
  return `${formatNumber(price / sqft)} / sqft`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
