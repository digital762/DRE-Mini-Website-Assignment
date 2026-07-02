"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { COMMUNITIES, PROPERTY_TYPES } from "@/lib/listings";
import { PRICE_RANGES, BED_OPTIONS, bedLabel } from "@/lib/priceRanges";
import type { PropertyType } from "@/lib/types";
import styles from "./HeroSearchCard.module.css";

type StatusOption = "All" | "Ready" | "Off-plan";

export function HeroSearchCard() {
  const router = useRouter();
  const [dealType, setDealType] = useState<"Buy" | "Rent">("Buy");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<StatusOption>("All");
  const [propertyType, setPropertyType] = useState<"All" | PropertyType>("All");
  const [minBeds, setMinBeds] = useState(0);
  const [priceIndex, setPriceIndex] = useState(0);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();

    const trimmed = location.trim();
    if (trimmed) {
      if (COMMUNITIES.includes(trimmed)) params.set("community", trimmed);
      else params.set("q", trimmed);
    }
    if (status !== "All") params.set("status", status);
    if (propertyType !== "All") params.set("type", propertyType);
    if (minBeds > 0) params.set("minBeds", String(minBeds));

    const range = PRICE_RANGES[priceIndex];
    if (range.min !== null) params.set("minPrice", String(range.min));
    if (range.max !== null) params.set("maxPrice", String(range.max));

    const qs = params.toString();
    router.push(qs ? `/listings?${qs}` : "/listings");
  }

  return (
    <form className={styles.card} onSubmit={handleSearch}>
      <div className={styles.row1}>
        <div className={styles.dealToggle}>
          {(["Buy", "Rent"] as const).map((d) => (
            <button
              key={d}
              type="button"
              className={dealType === d ? styles.dealActive : styles.deal}
              onClick={() => setDealType(d)}
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
          {(["All", "Ready", "Off-plan"] as const).map((s) => (
            <button
              key={s}
              type="button"
              className={status === s ? styles.statusActive : styles.status}
              onClick={() => setStatus(s)}
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
          <select
            value={minBeds}
            onChange={(e) => setMinBeds(Number(e.target.value))}
            aria-label="Bedrooms"
          >
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
            {PRICE_RANGES.map((range, i) => (
              <option key={range.label} value={i}>
                {range.label}
              </option>
            ))}
          </select>
          <i className="ph ph-caret-down" aria-hidden />
        </label>
      </div>
    </form>
  );
}
