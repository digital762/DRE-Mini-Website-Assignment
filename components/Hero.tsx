"use client";

import { useRouter } from "next/navigation";
import { HeroSearchCard } from "./HeroSearchCard";
import styles from "./Hero.module.css";

const QUICK_COMMUNITIES = ["Dubai Marina", "Palm Jumeirah", "Downtown Dubai", "Business Bay", "JBR", "DIFC"];

export function Hero() {
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <div className={styles.photo}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>Homegrown since 1986</div>
          <h1 className={styles.headline}>We know Dubai because we helped build it.</h1>
          <p className={styles.sub}>
            A curated portfolio of Dubai&apos;s most sought-after addresses, handled by agents who
            specialise by neighbourhood &mdash; from Betterhomes, the city&apos;s residential broker
            for forty years.
          </p>
        </div>
      </div>

      <div className={`bh-container ${styles.searchWrap}`}>
        <HeroSearchCard />

        <div className={styles.quickLinks}>
          <span className={styles.quickLabel}>Popular:</span>
          {QUICK_COMMUNITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => router.push(`/listings?community=${encodeURIComponent(c)}`)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
