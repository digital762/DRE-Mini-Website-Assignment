import { COMMUNITIES, PROPERTY_TYPES } from "./listings";
import { formatAEDCompact } from "./format";
import type { DealType, Listing, PropertyType } from "./types";

export type ParsedQuery = {
  minBeds: number | null;
  type: PropertyType | null;
  community: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  amenityKeywords: string[];
  dealTypeHint: DealType | null;
};

// Canonical amenity keyword -> phrases a person might actually type.
const AMENITY_SYNONYMS: Record<string, string[]> = {
  sea: ["sea view", "seaside", "sea-view", "beach", "beachfront", "waterfront", "marina view"],
  pool: ["pool", "swimming"],
  golf: ["golf"],
  garden: ["garden", "landscaped"],
  gym: ["gym", "fitness"],
  balcony: ["balcony"],
  "smart home": ["smart home", "smart-home"],
  parking: ["parking", "garage"],
  study: ["study", "home office"],
  maid: ["maid", "maids room", "maid's room"],
  pet: ["pet friendly", "pet-friendly", "pets allowed"],
  concierge: ["concierge"],
  terrace: ["terrace", "rooftop"],
};

// Friendlier phrasing for the assistant's reply than the internal keyword.
const AMENITY_LABELS: Record<string, string> = {
  sea: "a sea view",
  pool: "a pool",
  golf: "a golf course view",
  garden: "a garden",
  gym: "a gym",
  balcony: "a balcony",
  "smart home": "smart home features",
  parking: "parking",
  study: "a study",
  maid: "a maid's room",
  pet: "pet-friendly policies",
  concierge: "concierge service",
  terrace: "a terrace",
};

// Everything on a listing worth matching free text against — not just the
// amenities array, since a feature like a sea view is often only reflected
// in the card's tag or its description.
export function amenityHaystack(listing: Listing): string {
  return [listing.tag ?? "", ...listing.amenities, listing.description].join(" ").toLowerCase();
}

function parseAmount(raw: string): number {
  const cleaned = raw.replace(/,/g, "").trim().toLowerCase();
  const millions = cleaned.match(/^([\d.]+)\s*m(?:illion)?$/);
  if (millions) return parseFloat(millions[1]) * 1_000_000;
  const thousands = cleaned.match(/^([\d.]+)\s*k$/);
  if (thousands) return parseFloat(thousands[1]) * 1_000;
  return parseFloat(cleaned);
}

const NUMBER_TOKEN = "([\\d][\\d.,]*\\s*[mk]?)";

export function parseQuery(text: string): ParsedQuery {
  const q = ` ${text.toLowerCase()} `;

  let minBeds: number | null = null;
  const bedMatch = q.match(/(\d+)\s*-?\s*(?:bed|bedroom|br)\b/);
  if (bedMatch) minBeds = parseInt(bedMatch[1], 10);
  if (/\bstudio\b/.test(q)) minBeds = 0;

  let type: PropertyType | null = null;
  for (const t of PROPERTY_TYPES) {
    if (q.includes(t.toLowerCase())) {
      type = t;
      break;
    }
  }

  let community: string | null = null;
  for (const c of COMMUNITIES) {
    if (q.includes(c.toLowerCase())) {
      community = c;
      break;
    }
  }
  if (!community) {
    if (q.includes("marina")) community = "Dubai Marina";
    else if (q.includes("downtown")) community = "Downtown Dubai";
    else if (q.includes("palm")) community = "Palm Jumeirah";
    else if (q.includes("jvc") || q.includes("village circle")) community = "Jumeirah Village Circle";
  }

  let minPrice: number | null = null;
  let maxPrice: number | null = null;

  const between = q.match(
    new RegExp(`between\\s*(?:aed)?\\s*${NUMBER_TOKEN}\\s*(?:and|-|to)\\s*(?:aed)?\\s*${NUMBER_TOKEN}`)
  );
  const under = q.match(new RegExp(`(?:under|below|less than|up to|max)\\s*(?:aed)?\\s*${NUMBER_TOKEN}`));
  const over = q.match(new RegExp(`(?:over|above|more than|from|min)\\s*(?:aed)?\\s*${NUMBER_TOKEN}`));

  if (between) {
    minPrice = parseAmount(between[1]);
    maxPrice = parseAmount(between[2]);
  } else {
    if (under) maxPrice = parseAmount(under[1]);
    if (over) minPrice = parseAmount(over[1]);
  }

  const amenityKeywords: string[] = [];
  for (const [canonical, synonyms] of Object.entries(AMENITY_SYNONYMS)) {
    if (synonyms.some((s) => q.includes(s))) amenityKeywords.push(canonical);
  }

  let dealTypeHint: DealType | null = null;
  if (/\brent(al|ing)?\b|\bto let\b|\blease\b/.test(q)) dealTypeHint = "Rent";
  else if (/\bbuy\b|\bpurchase\b|\bfor sale\b|\bsale\b/.test(q)) dealTypeHint = "Sale";

  return { minBeds, type, community, minPrice, maxPrice, amenityKeywords, dealTypeHint };
}

export function matchListings(listings: Listing[], parsed: ParsedQuery): Listing[] {
  return listings.filter((listing) => {
    if (parsed.minBeds !== null && listing.beds !== parsed.minBeds) return false;
    if (parsed.type && listing.type !== parsed.type) return false;
    if (parsed.community && listing.community !== parsed.community) return false;
    if (parsed.minPrice !== null && listing.price < parsed.minPrice) return false;
    if (parsed.maxPrice !== null && listing.price > parsed.maxPrice) return false;
    if (parsed.amenityKeywords.length) {
      const haystack = amenityHaystack(listing);
      if (!parsed.amenityKeywords.every((kw) => haystack.includes(kw))) return false;
    }
    return true;
  });
}

export function explainQuery(parsed: ParsedQuery, count: number, dealType: DealType): string {
  const bits: string[] = [];
  if (parsed.minBeds !== null) bits.push(parsed.minBeds === 0 ? "studio" : `${parsed.minBeds}-bedroom`);
  bits.push(parsed.type ? parsed.type.toLowerCase() + (count === 1 ? "" : "s") : dealType === "Rent" ? "rentals" : "properties");
  if (parsed.community) bits.push(`in ${parsed.community}`);
  if (parsed.amenityKeywords.length) {
    bits.push(`with ${parsed.amenityKeywords.map((kw) => AMENITY_LABELS[kw] ?? kw).join(" and ")}`);
  }
  if (parsed.minPrice !== null && parsed.maxPrice !== null) {
    bits.push(`between ${formatAEDCompact(parsed.minPrice)} and ${formatAEDCompact(parsed.maxPrice)}`);
  } else if (parsed.maxPrice !== null) {
    bits.push(`under ${formatAEDCompact(parsed.maxPrice)}`);
  } else if (parsed.minPrice !== null) {
    bits.push(`over ${formatAEDCompact(parsed.minPrice)}`);
  }
  return `Found ${count} ${bits.join(" ")}.`;
}
