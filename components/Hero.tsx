"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { COMMUNITIES } from "@/lib/listings";
import styles from "./Hero.module.css";

const QUICK_COMMUNITIES = ["Dubai Marina", "Palm Jumeirah", "Downtown Dubai", "Business Bay", "JBR", "DIFC"];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dealType, setDealType] = useState<"Buy" | "Rent">("Buy");

  function goToListings(term: string) {
    const trimmed = term.trim();
    if (!trimmed) {
      router.push("/listings");
      return;
    }
    if (COMMUNITIES.includes(trimmed)) {
      router.push(`/listings?community=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`/listings?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.eyebrow}>Homegrown since 1986</div>
        <h1 className={styles.headline}>We know Dubai because we helped build it.</h1>
        <p className={styles.sub}>
          From a desk in Linda&apos;s dining room to 40,000 closed deals &mdash; betterhomes has been
          Dubai&apos;s residential broker for forty years.
        </p>

        <form
          className={styles.searchBar}
          onSubmit={(e) => {
            e.preventDefault();
            goToListings(query);
          }}
        >
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
          <i className="ph ph-magnifying-glass" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Area, building, or community"
            aria-label="Search area, building, or community"
          />
          <button type="submit" className={styles.searchBtn}>
            Search <i className="ph ph-arrow-right" aria-hidden />
          </button>
        </form>

        <div className={styles.quickLinks}>
          {QUICK_COMMUNITIES.map((c) => (
            <button key={c} type="button" onClick={() => goToListings(c)}>
              {c} <i className="ph ph-arrow-up-right" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
