import { EstBadge } from "./Wordmark";
import { Button } from "./Button";
import styles from "./TrustSection.module.css";

const STATS = [
  { value: "1986", label: "Founded in Dubai" },
  { value: "40,000+", label: "Deals closed" },
  { value: "300+", label: "Agents across the city" },
  { value: "15", label: "Communities covered" },
];

export function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={`bh-container ${styles.inner}`}>
        <div className={styles.copy}>
          <div className="bh-eyebrow">Why betterhomes</div>
          <h2 className={styles.heading}>Forty years of knowing this city.</h2>
          <p className={styles.body}>
            Betterhomes started at a small desk in Linda&apos;s dining room, long before Dubai
            Marina existed. We&apos;ve watched the city grow from the ground up, and we still
            work the same way: agents who specialise by neighbourhood, straight advice, and no
            pressure to close.
          </p>
          <div className={styles.estRow}>
            <EstBadge size={20} />
          </div>
          <Button href="/listings" variant="secondary" iconRight="arrow-right">
            Browse listings
          </Button>
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
