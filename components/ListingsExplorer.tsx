"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LISTINGS, COMMUNITIES, PROPERTY_TYPES } from "@/lib/listings";
import type { PropertyType } from "@/lib/types";
import { ListingCard } from "./ListingCard";
import { FilterSidebar, EMPTY_FILTERS, type Filters } from "./FilterSidebar";
import styles from "./ListingsExplorer.module.css";

type SortKey = "newest" | "price-asc" | "price-desc" | "beds-desc";

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "beds-desc": "Most bedrooms",
};

export function ListingsExplorer() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => {
    const community = searchParams.get("community");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minBeds = Number(searchParams.get("minBeds") ?? 0);
    return {
      ...EMPTY_FILTERS,
      communities: community && COMMUNITIES.includes(community) ? [community] : [],
      types: type && PROPERTY_TYPES.includes(type as PropertyType) ? [type as PropertyType] : [],
      status: status === "Ready" || status === "Off-plan" ? status : "All",
      minPrice: minPrice ?? "",
      maxPrice: maxPrice ?? "",
      minBeds: Number.isFinite(minBeds) ? Math.min(Math.max(minBeds, 0), 5) : 0,
    };
  });
  const [query] = useState(() => (searchParams.get("q") ?? "").trim().toLowerCase());
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    const filtered = LISTINGS.filter((listing) => {
      if (filters.communities.length && !filters.communities.includes(listing.community)) return false;
      if (filters.types.length && !filters.types.includes(listing.type)) return false;
      if (filters.status !== "All" && listing.status !== filters.status) return false;
      if (min !== null && listing.price < min) return false;
      if (max !== null && listing.price > max) return false;
      if (listing.beds < filters.minBeds) return false;
      if (query) {
        const haystack = `${listing.title} ${listing.community} ${listing.subCommunity ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "beds-desc":
          return b.beds - a.beds;
        case "newest":
        default:
          return new Date(b.listedOn).getTime() - new Date(a.listedOn).getTime();
      }
    });

    return sorted;
  }, [filters, sortBy, query]);

  return (
    <div className={`bh-container ${styles.wrap}`}>
      <button
        type="button"
        className={styles.filterToggle}
        onClick={() => setFiltersOpen((v) => !v)}
      >
        <i className="ph ph-sliders-horizontal" aria-hidden /> Filters
      </button>

      <div className={`${styles.sidebarCol} ${filtersOpen ? styles.sidebarColOpen : ""}`}>
        <FilterSidebar filters={filters} onChange={setFilters} />
      </div>

      <div className={styles.mainCol}>
        <div className={styles.toolbar}>
          <div className={styles.resultCount}>
            {results.length} {results.length === 1 ? "property" : "properties"}
          </div>
          <div className={styles.toolbarActions}>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              aria-label="Sort listings"
            >
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <div className={styles.layoutToggle}>
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={layout === "grid"}
                className={layout === "grid" ? styles.layoutBtnActive : styles.layoutBtn}
                onClick={() => setLayout("grid")}
              >
                <i className="ph ph-squares-four" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="List view"
                aria-pressed={layout === "list"}
                className={layout === "list" ? styles.layoutBtnActive : styles.layoutBtn}
                onClick={() => setLayout("list")}
              >
                <i className="ph ph-list-bullets" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div className={styles.empty}>
            <p>No properties match those filters yet.</p>
            <button type="button" onClick={() => setFilters(EMPTY_FILTERS)}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={layout === "grid" ? styles.grid : styles.list}>
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} layout={layout} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
