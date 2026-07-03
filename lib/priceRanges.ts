export type PriceRange = {
  label: string;
  min: number | null;
  max: number | null;
};

export const SALE_PRICE_RANGES: PriceRange[] = [
  { label: "Any price", min: null, max: null },
  { label: "Under AED 1M", min: null, max: 1_000_000 },
  { label: "AED 1M – 3M", min: 1_000_000, max: 3_000_000 },
  { label: "AED 3M – 5M", min: 3_000_000, max: 5_000_000 },
  { label: "AED 5M – 10M", min: 5_000_000, max: 10_000_000 },
  { label: "AED 10M+", min: 10_000_000, max: null },
];

export const RENT_PRICE_RANGES: PriceRange[] = [
  { label: "Any price", min: null, max: null },
  { label: "Under AED 50K/yr", min: null, max: 50_000 },
  { label: "AED 50K – 100K/yr", min: 50_000, max: 100_000 },
  { label: "AED 100K – 150K/yr", min: 100_000, max: 150_000 },
  { label: "AED 150K – 250K/yr", min: 150_000, max: 250_000 },
  { label: "AED 250K+/yr", min: 250_000, max: null },
];

// Back-compat alias for the sale price presets used by the homepage search.
export const PRICE_RANGES = SALE_PRICE_RANGES;

export const BED_OPTIONS = [0, 1, 2, 3, 4, 5];
export const BATH_OPTIONS = [0, 1, 2, 3, 4, 5];

export function bedLabel(n: number): string {
  if (n === 0) return "Any beds";
  return `${n}+ ${n === 1 ? "bed" : "beds"}`;
}

export function bathLabel(n: number): string {
  if (n === 0) return "Any baths";
  return `${n}+ ${n === 1 ? "bath" : "baths"}`;
}
