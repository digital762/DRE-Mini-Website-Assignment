import { COMMUNITIES, PROPERTY_TYPES } from "@/lib/listings";
import type { PropertyType } from "@/lib/types";
import styles from "./FilterSidebar.module.css";

export type StatusFilter = "All" | "Ready" | "Off-plan";

export type Filters = {
  communities: string[];
  types: PropertyType[];
  status: StatusFilter;
  minPrice: string;
  maxPrice: string;
  minBeds: number;
};

export const EMPTY_FILTERS: Filters = {
  communities: [],
  types: [],
  status: "All",
  minPrice: "",
  maxPrice: "",
  minBeds: 0,
};

export function FilterSidebar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  function toggleCommunity(community: string) {
    const next = filters.communities.includes(community)
      ? filters.communities.filter((c) => c !== community)
      : [...filters.communities, community];
    onChange({ ...filters, communities: next });
  }

  function toggleType(type: PropertyType) {
    const next = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types: next });
  }

  const hasActiveFilters =
    filters.communities.length > 0 ||
    filters.types.length > 0 ||
    filters.status !== "All" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.minBeds > 0;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Filters</h2>
        {hasActiveFilters && (
          <button type="button" className={styles.reset} onClick={() => onChange(EMPTY_FILTERS)}>
            Reset all
          </button>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Location</div>
        <div className={styles.checkList}>
          {COMMUNITIES.map((community) => (
            <label key={community} className={styles.checkRow}>
              <input
                type="checkbox"
                checked={filters.communities.includes(community)}
                onChange={() => toggleCommunity(community)}
              />
              {community}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Property type</div>
        <div className={styles.checkList}>
          {PROPERTY_TYPES.map((type) => (
            <label key={type} className={styles.checkRow}>
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleType(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Status</div>
        <div className={styles.bedRow}>
          {(["All", "Ready", "Off-plan"] as const).map((status) => (
            <button
              key={status}
              type="button"
              className={[styles.bedChip, filters.status === status ? styles.bedChipActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onChange({ ...filters, status })}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Price range (AED)</div>
        <div className={styles.priceRow}>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className={styles.priceInput}
          />
          <span className={styles.priceDash}>&ndash;</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className={styles.priceInput}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Bedrooms</div>
        <div className={styles.bedRow}>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={[styles.bedChip, filters.minBeds === n ? styles.bedChipActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onChange({ ...filters, minBeds: n })}
            >
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
