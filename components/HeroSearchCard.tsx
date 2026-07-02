"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { COMMUNITIES, PROPERTY_TYPES } from "@/lib/listings";
import { SALE_PRICE_RANGES, RENT_PRICE_RANGES, BED_OPTIONS, bedLabel } from "@/lib/priceRanges";
import { parseQuery } from "@/lib/aiSearch";
import type { PropertyType } from "@/lib/types";
import styles from "./HeroSearchCard.module.css";

type DealTypeUi = "Buy" | "Rent";

const SALE_SECONDARY = ["All", "Ready", "Off-plan"] as const;
const RENT_SECONDARY = ["All", "Furnished", "Unfurnished"] as const;

export function HeroSearchCard() {
  const router = useRouter();
  const [dealType, setDealType] = useState<DealTypeUi>("Buy");
  const [askQuery, setAskQuery] = useState("");
  const [location, setLocation] = useState("");
  const [secondary, setSecondary] = useState<string>("All");
  const [propertyType, setPropertyType] = useState<"All" | PropertyType>("All");
  const [minBeds, setMinBeds] = useState(0);
  const [priceIndex, setPriceIndex] = useState(0);

  const priceRanges = dealType === "Rent" ? RENT_PRICE_RANGES : SALE_PRICE_RANGES;
  const secondaryOptions = dealType === "Rent" ? RENT_SECONDARY : SALE_SECONDARY;
  const destination = dealType === "Rent" ? "/properties-for-rent" : "/properties-for-sale";

  function goWithFilters() {
    const params = new URLSearchParams();
    const trimmed = location.trim();
    if (trimmed) {
      if (COMMUNITIES.includes(trimmed)) params.set("community", trimmed);
      else params.set("q", trimmed);
    }
    if (secondary !== "All") {
      if (dealType === "Rent") params.set("furnished", secondary);
      else params.set("status", secondary);
    }
    if (propertyType !== "All") params.set("type", propertyType);
    if (minBeds > 0) params.set("minBeds", String(minBeds));

    const range = priceRanges[priceIndex];
    if (range.min !== null) params.set("minPrice", String(range.min));
    if (range.max !== null) params.set("maxPrice", String(range.max));

    const qs = params.toString();
    router.push(qs ? `${destination}?${qs}` : destination);
  }

  function handleFilterSearch(e: React.FormEvent) {
    e.preventDefault();
    goWithFilters();
  }

  function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = askQuery.trim();
    if (!trimmed) return;
    const parsed = parseQuery(trimmed);
    const target = parsed.dealTypeHint === "Rent" ? "/properties-for-rent" : parsed.dealTypeHint === "Sale" ? "/properties-for-sale" : destination;
    router.push(`${target}?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className={styles.card}>
      <form className={styles.askBar} onSubmit={handleAsk}>
        <i className="ph-fill ph-sparkle" aria-hidden />
        <input
          value={askQuery}
          onChange={(e) => setAskQuery(e.target.value)}
          placeholder="Try asking for '3 bedroom apartment with sea view'"
          aria-label="Ask betterhomes"
        />
        <button type="submit" className={styles.askBtn}>
          Ask
        </button>
      </form>

      <div className={styles.orDivider}>or continue using the filters below</div>

      <form onSubmit={handleFilterSearch}>
        <div className={styles.row1}>
          <div className={styles.dealToggle}>
            {(["Buy", "Rent"] as const).map((d) => (
              <button
                key={d}
                type="button"
                className={dealType === d ? styles.dealActive : styles.deal}
                onClick={() => {
                  setDealType(d);
                  setSecondary("All");
                  setPriceIndex(0);
                }}
              >
                {d}
              </button>
            ))}
          </div>

          <div className={styles.locationField}>
            <i className="ph ph-map-pin" aria-hidden />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location, building, or community"
              aria-label="Location"
              list="hero-communities"
            />
            <datalist id="hero-communities">
              {COMMUNITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <button type="submit" className={styles.searchBtn}>
            <i className="ph ph-magnifying-glass" aria-hidden />
            Search
          </button>
        </div>

        <div className={styles.row2}>
          <div className={styles.statusToggle}>
            {secondaryOptions.map((s) => (
              <button
                key={s}
                type="button"
                className={secondary === s ? styles.statusActive : styles.status}
                onClick={() => setSecondary(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <label className={styles.selectField}>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as "All" | PropertyType)}
              aria-label="Property type"
            >
              <option value="All">Property type</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <i className="ph ph-caret-down" aria-hidden />
          </label>

          <label className={styles.selectField}>
            <select value={minBeds} onChange={(e) => setMinBeds(Number(e.target.value))} aria-label="Bedrooms">
              {BED_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {bedLabel(n)}
                </option>
              ))}
            </select>
            <i className="ph ph-caret-down" aria-hidden />
          </label>

          <label className={styles.selectField}>
            <select
              value={priceIndex}
              onChange={(e) => setPriceIndex(Number(e.target.value))}
              aria-label="Price range"
            >
              {priceRanges.map((range, i) => (
                <option key={range.label} value={i}>
                  {range.label}
                </option>
              ))}
            </select>
            <i className="ph ph-caret-down" aria-hidden />
          </label>
        </div>
      </form>
    </div>
  );
}
