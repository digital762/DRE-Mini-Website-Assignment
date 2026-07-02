"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LISTINGS, COMMUNITIES, PROPERTY_TYPES } from "@/lib/listings";
import type { DealType, Listing, PropertyType } from "@/lib/types";
import { SALE_PRICE_RANGES, RENT_PRICE_RANGES, BED_OPTIONS, bedLabel } from "@/lib/priceRanges";
import { parseQuery, explainQuery, amenityHaystack, type ParsedQuery } from "@/lib/aiSearch";
import { ListingCard } from "./ListingCard";
import { PropertyRow } from "./PropertyRow";
import { agentAvatar } from "@/lib/images";
import styles from "./PropertyExplorer.module.css";

type SortKey = "newest" | "price-asc" | "price-desc" | "beds-desc";

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "beds-desc": "Most bedrooms",
};

type ExplorerFilters = {
  communities: string[];
  types: PropertyType[];
  secondary: string;
  minBeds: number;
  minPrice: string;
  maxPrice: string;
  amenityKeywords: string[];
};

const EMPTY: ExplorerFilters = {
  communities: [],
  types: [],
  secondary: "All",
  minBeds: 0,
  minPrice: "",
  maxPrice: "",
  amenityKeywords: [],
};

function applyFilters(dataset: Listing[], dealType: DealType, filters: ExplorerFilters): Listing[] {
  const min = filters.minPrice === "" ? null : Number(filters.minPrice);
  const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

  return dataset.filter((listing) => {
    if (filters.communities.length && !filters.communities.includes(listing.community)) return false;
    if (filters.types.length && !filters.types.includes(listing.type)) return false;
    if (filters.secondary !== "All") {
      if (dealType === "Sale" && listing.status !== filters.secondary) return false;
      if (dealType === "Rent" && listing.furnished !== filters.secondary) return false;
    }
    if (min !== null && listing.price < min) return false;
    if (max !== null && listing.price > max) return false;
    if (listing.beds < filters.minBeds) return false;
    if (filters.amenityKeywords.length) {
      const haystack = amenityHaystack(listing);
      if (!filters.amenityKeywords.every((kw) => haystack.includes(kw))) return false;
    }
    return true;
  });
}

function parsedToFilters(parsed: ParsedQuery, base: ExplorerFilters): ExplorerFilters {
  return {
    ...base,
    communities: parsed.community ? [parsed.community] : base.communities,
    types: parsed.type ? [parsed.type] : base.types,
    minBeds: parsed.minBeds !== null ? parsed.minBeds : base.minBeds,
    minPrice: parsed.minPrice !== null ? String(parsed.minPrice) : base.minPrice,
    maxPrice: parsed.maxPrice !== null ? String(parsed.maxPrice) : base.maxPrice,
    amenityKeywords: parsed.amenityKeywords,
  };
}

export function PropertyExplorer({ dealType }: { dealType: DealType }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataset = useMemo(() => LISTINGS.filter((l) => l.dealType === dealType), [dealType]);
  const priceRanges = dealType === "Rent" ? RENT_PRICE_RANGES : SALE_PRICE_RANGES;
  const secondaryOptions = dealType === "Rent" ? ["All", "Furnished", "Unfurnished", "Partly furnished"] : ["All", "Ready", "Off-plan"];
  const otherDealHref = dealType === "Rent" ? "/properties-for-sale" : "/properties-for-rent";

  const initial = useMemo(() => {
    const community = searchParams.get("community");
    const type = searchParams.get("type");
    const secondary = searchParams.get("status") ?? searchParams.get("furnished");
    const minBeds = Number(searchParams.get("minBeds") ?? 0);
    const minPrice = searchParams.get("minPrice") ?? "";
    const maxPrice = searchParams.get("maxPrice") ?? "";
    const q = searchParams.get("q") ?? "";

    let base: ExplorerFilters = {
      ...EMPTY,
      communities: community && COMMUNITIES.includes(community) ? [community] : [],
      types: type && PROPERTY_TYPES.includes(type as PropertyType) ? [type as PropertyType] : [],
      secondary: secondary && secondaryOptions.includes(secondary) ? secondary : "All",
      minBeds: Number.isFinite(minBeds) ? Math.min(Math.max(minBeds, 0), 5) : 0,
      minPrice,
      maxPrice,
    };

    let explanation = "";
    if (q) {
      const parsed = parseQuery(q);
      base = parsedToFilters(parsed, base);
      explanation = explainQuery(parsed, applyFilters(dataset, dealType, base).length, dealType);
    }

    return { filters: base, aiQuery: q, explanation };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filters, setFilters] = useState<ExplorerFilters>(initial.filters);
  const [aiQuery, setAiQuery] = useState(initial.aiQuery);
  const [explanation, setExplanation] = useState(initial.explanation);
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [layout, setLayout] = useState<"list" | "grid">("list");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = applyFilters(dataset, dealType, filters);
    return [...filtered].sort((a, b) => {
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
  }, [dataset, dealType, filters, sortBy]);

  function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseQuery(aiQuery);
    if (parsed.dealTypeHint && parsed.dealTypeHint !== dealType) {
      router.push(`${otherDealHref}?q=${encodeURIComponent(aiQuery)}`);
      return;
    }
    const next = parsedToFilters(parsed, filters);
    setFilters(next);
    setExplanation(explainQuery(parsed, applyFilters(dataset, dealType, next).length, dealType));
  }

  function updateFilters(patch: Partial<ExplorerFilters>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setExplanation("");
  }

  function toggleCommunity(community: string) {
    updateFilters({
      communities: filters.communities.includes(community)
        ? filters.communities.filter((c) => c !== community)
        : [...filters.communities, community],
    });
  }

  function toggleType(type: PropertyType) {
    updateFilters({
      types: filters.types.includes(type) ? filters.types.filter((t) => t !== type) : [...filters.types, type],
    });
  }

  const chips: { label: string; onRemove: () => void }[] = [
    ...filters.communities.map((c) => ({ label: c, onRemove: () => toggleCommunity(c) })),
    ...filters.types.map((t) => ({ label: t, onRemove: () => toggleType(t) })),
    ...(filters.secondary !== "All"
      ? [{ label: filters.secondary, onRemove: () => updateFilters({ secondary: "All" }) }]
      : []),
    ...(filters.minBeds > 0
      ? [{ label: bedLabel(filters.minBeds), onRemove: () => updateFilters({ minBeds: 0 }) }]
      : []),
    ...(filters.minPrice || filters.maxPrice
      ? [{ label: "Price range", onRemove: () => updateFilters({ minPrice: "", maxPrice: "" }) }]
      : []),
    ...filters.amenityKeywords.map((kw) => ({
      label: kw,
      onRemove: () => updateFilters({ amenityKeywords: filters.amenityKeywords.filter((k) => k !== kw) }),
    })),
  ];

  const communityCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of dataset) counts.set(l.community, (counts.get(l.community) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [dataset]);

  const specialistAgent = dataset[0]?.agent;

  return (
    <div className={styles.page}>
      <div className={`bh-container ${styles.askWrap}`}>
        <form className={styles.askBar} onSubmit={handleAsk}>
          <input
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder={`Try asking for '3 bedroom ${dealType === "Rent" ? "apartment to rent" : "apartment"} with sea view'`}
          />
          <button type="submit" className={styles.askBtn}>
            <i className="ph-fill ph-sparkle" aria-hidden />
            Ask
          </button>
        </form>
        {explanation && (
          <div className={styles.explanation}>
            <i className="ph-fill ph-sparkle" aria-hidden /> {explanation}
          </div>
        )}
        <div className={styles.orDivider}>or continue using the filters below</div>

        <div className={styles.filterBar}>
          <label className={styles.selectField}>
            <select
              value={filters.types[0] ?? "All"}
              onChange={(e) => updateFilters({ types: e.target.value === "All" ? [] : [e.target.value as PropertyType] })}
            >
              <option value="All">Property type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <i className="ph ph-caret-down" aria-hidden />
          </label>

          <button type="button" className={styles.filterToggleBtn} onClick={() => setFiltersOpen((v) => !v)}>
            <i className="ph ph-map-pin" aria-hidden />
            {filters.communities.length ? filters.communities.join(", ") : "Enter location"}
          </button>

          <label className={styles.selectField}>
            <select value={filters.minBeds} onChange={(e) => updateFilters({ minBeds: Number(e.target.value) })}>
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
              value={`${filters.minPrice}-${filters.maxPrice}`}
              onChange={(e) => {
                const range = priceRanges.find((r) => `${r.min ?? ""}-${r.max ?? ""}` === e.target.value);
                updateFilters({
                  minPrice: range?.min != null ? String(range.min) : "",
                  maxPrice: range?.max != null ? String(range.max) : "",
                });
              }}
            >
              {priceRanges.map((r) => (
                <option key={r.label} value={`${r.min ?? ""}-${r.max ?? ""}`}>
                  {r.label}
                </option>
              ))}
            </select>
            <i className="ph ph-caret-down" aria-hidden />
          </label>

          <button type="button" className={styles.moreFiltersBtn} onClick={() => setFiltersOpen((v) => !v)}>
            More filters
            {chips.length > 0 && <span className={styles.moreFiltersCount}>{chips.length}</span>}
          </button>
        </div>

        {filtersOpen && (
          <div className={styles.morePanel}>
            <div className={styles.morePanelSection}>
              <div className={styles.morePanelTitle}>Location</div>
              <div className={styles.checkGrid}>
                {COMMUNITIES.map((c) => (
                  <label key={c} className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={filters.communities.includes(c)}
                      onChange={() => toggleCommunity(c)}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.morePanelSection}>
              <div className={styles.morePanelTitle}>{dealType === "Rent" ? "Furnishing" : "Status"}</div>
              <div className={styles.pillRow}>
                {secondaryOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={filters.secondary === opt ? styles.pillActive : styles.pill}
                    onClick={() => updateFilters({ secondary: opt })}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {chips.length > 0 && (
          <div className={styles.chipsRow}>
            {chips.map((chip) => (
              <span key={chip.label} className={styles.chip}>
                {chip.label}
                <button type="button" onClick={chip.onRemove} aria-label={`Remove ${chip.label} filter`}>
                  <i className="ph ph-x" aria-hidden />
                </button>
              </span>
            ))}
            <button
              type="button"
              className={styles.clearAll}
              onClick={() => {
                setFilters(EMPTY);
                setExplanation("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className={`bh-container ${styles.communityRow}`}>
        {communityCounts.map(([community, count]) => (
          <button key={community} type="button" onClick={() => toggleCommunity(community)}>
            {community} <span>({count})</span>
          </button>
        ))}
      </div>

      <div className={`bh-container ${styles.body}`}>
        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.resultCount}>
              {results.length} {dealType === "Rent" ? "Properties for Rent" : "Properties for Sale"} in Dubai
            </div>
            <div className={styles.toolbarActions}>
              <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}>
                {Object.entries(SORT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <div className={styles.layoutToggle}>
                <button
                  type="button"
                  className={layout === "list" ? styles.layoutBtnActive : styles.layoutBtn}
                  onClick={() => setLayout("list")}
                  aria-pressed={layout === "list"}
                >
                  <i className="ph ph-list-bullets" aria-hidden /> List
                </button>
                <button
                  type="button"
                  className={layout === "grid" ? styles.layoutBtnActive : styles.layoutBtn}
                  onClick={() => setLayout("grid")}
                  aria-pressed={layout === "grid"}
                >
                  <i className="ph ph-squares-four" aria-hidden /> Grid
                </button>
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className={styles.empty}>
              <p>No {dealType === "Rent" ? "rentals" : "properties"} match those filters yet.</p>
              <button
                type="button"
                onClick={() => {
                  setFilters(EMPTY);
                  setExplanation("");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : layout === "list" ? (
            <div className={styles.list}>
              {results.map((listing) => (
                <PropertyRow key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {results.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        <aside className={styles.sidebar}>
          {specialistAgent && (
            <div className={styles.sidebarCard}>
              <div className={styles.specialistHead}>
                <span
                  className={styles.specialistAvatar}
                  style={{ backgroundImage: `url(${agentAvatar(specialistAgent.email)})` }}
                />
                <div>
                  <div className={styles.specialistName}>{specialistAgent.name}</div>
                  <div className={styles.specialistRole}>{specialistAgent.role}</div>
                </div>
              </div>
              <p className={styles.specialistBlurb}>
                Talk to a specialist about {dealType === "Rent" ? "renting" : "buying"} in{" "}
                {specialistAgent.area}.
              </p>
              <div className={styles.specialistActions}>
                <a href={`tel:${specialistAgent.phone.replace(/\s+/g, "")}`} className={styles.specialistBtn}>
                  <i className="ph ph-phone" aria-hidden /> Call
                </a>
                <a href={`mailto:${specialistAgent.email}`} className={styles.specialistBtn}>
                  <i className="ph ph-envelope-simple" aria-hidden /> Email
                </a>
              </div>
            </div>
          )}

          <div className={styles.ctaCard}>
            <div className={styles.ctaTitle}>
              {dealType === "Rent" ? "List your property for rent" : "Sell your property"}
            </div>
            <p className={styles.ctaBody}>Connect with a specialist agent to secure the best deal, faster.</p>
            <a href="mailto:hello@bhomes.com" className={styles.ctaBtn}>
              Get started <i className="ph ph-arrow-right" aria-hidden />
            </a>
          </div>

          <div className={styles.sidebarCard}>
            <div className={styles.morePanelTitle}>Popular searches</div>
            <div className={styles.popularLinks}>
              {PROPERTY_TYPES.map((t) => (
                <Link key={t} href={`${dealType === "Rent" ? "/properties-for-rent" : "/properties-for-sale"}?type=${t}`}>
                  {t}s {dealType === "Rent" ? "for rent" : "for sale"} in Dubai
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
