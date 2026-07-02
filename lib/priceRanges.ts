export type PriceRange = {
  label: string;
  min: number | null;
  max: number | null;
};

export const PRICE_RANGES: PriceRange[] = [
  { label: "Any price", min: null, max: null },
  { label: "Under AED 1M", min: null, max: 1_000_000 },
  { label: "AED 1M – 3M", min: 1_000_000, max: 3_000_000 },
  { label: "AED 3M – 5M", min: 3_000_000, max: 5_000_000 },
  { label: "AED 5M – 10M", min: 5_000_000, max: 10_000_000 },
  { label: "AED 10M+", min: 10_000_000, max: null },
];

export const BED_OPTIONS = [0, 1, 2, 3, 4, 5];

export function bedLabel(n: number): string {
  return n === 0 ? "Any beds" : `${n}+ ${n === 1 ? "bed" : "beds"}`;
}
