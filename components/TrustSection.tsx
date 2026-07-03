import { EstBadge } from "./Wordmark";
import { Button } from "./Button";
import styles from "./TrustSection.module.css";

const STATS = [
  { value: "1986", label: "Founded in Dubai" },
  { value: "40,000+", label: "Deals closed" },
  { value: "250+", label: "Agents across the city" },
  { value: "15", label: "Communities covered" },
];

export function TrustSection() {
  return (
    <section className={styles.section} id="why-betterhomes">
      <div className={`bh-container ${styles.inner}`}>
        <div className={styles.copy}>
          <div className="bh-eyebrow">Why betterhomes</div>
          <h2 className={styles.heading}>Experience matters.</h2>
          <p className={styles.body}>
            We started at a small desk in Linda&apos;s dining room, long before Dubai Marina
            existed, and grew up alongside this city rather than arriving to sell it. These days
            that means an agent who knows your building, straight answers even when they&apos;re
            not what you want to hear, and somewhere in Dubai, a family moving into a new home
            roughly every thirty minutes.
          </p>
          <div className={styles.estRow}>
            <EstBadge size={20} />
          </div>
          <div className={styles.ctaRow}>
            <Button href="/properties-for-sale" variant="secondary" iconRight="arrow-right">
              Browse listings
            </Button>
            <Button href="/about" variant="ghost" iconRight="arrow-right">
              Our story
            </Button>
          </div>
        </div>

        <div className={styles.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
