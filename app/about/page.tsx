import type { Metadata } from "next";
import Link from "next/link";
import { EstBadge } from "@/components/Wordmark";
import { Button } from "@/components/Button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About us — betterhomes",
  description: "Forty years of betterhomes in Dubai — our story, our milestones, and how we work.",
};

const MILESTONES = [
  {
    year: "1986",
    title: "A desk in Linda's dining room",
    body: "Betterhomes opens with one desk, one phone line, and a handful of villa rentals in a Dubai that hadn't yet built the Marina or Downtown.",
  },
  {
    year: "1996",
    title: "First office, first team",
    body: "A decade in, betterhomes moves into its first proper office and hires its first agents specialising by community rather than by desk.",
  },
  {
    year: "2005",
    title: "Growing with the skyline",
    body: "As Dubai Marina, JBR, and Downtown rise, betterhomes builds dedicated teams for each new community as it comes to market.",
  },
  {
    year: "2012",
    title: "40,000th deal closed",
    body: "Two and a half decades of straight advice add up to 40,000 closed transactions across sales, leasing, and property management.",
  },
  {
    year: "Today",
    title: "250+ agents, 15 communities",
    body: "betterhomes covers Dubai end to end, and somewhere in the city a family moves into a new home roughly every thirty minutes. Still run on the same principle Linda started with: know the building, know the buyer, tell the truth.",
  },
];

const VALUES = [
  {
    icon: "map-pin",
    title: "Local, not generalist",
    body: "Our agents work two or three communities each, not the whole city. They know which floor gets the marina view and which building has a slow lift.",
  },
  {
    icon: "chat-circle",
    title: "Straight advice",
    body: "We'll tell you when a property isn't right for you — and show you a better one the same afternoon. No pressure, no upsell.",
  },
  {
    icon: "handshake",
    title: "Built for the long term",
    body: "Most of our business comes from repeat clients and referrals. We'd rather earn the next deal than rush this one.",
  },
  {
    icon: "shield-check",
    title: "Licensed and accountable",
    body: "RERA-registered, ISO-aligned processes, and an internal compliance team that checks every listing before it goes live.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="bh-container">
          <div className="bh-eyebrow">About us</div>
          <h1 className={styles.title}>Forty years in the making.</h1>
          <p className={styles.subtitle}>
            betterhomes has been Dubai&apos;s residential broker since before the Marina existed.
            Here&apos;s how a desk in a dining room became a 250-agent brokerage.
          </p>
        </div>
      </div>

      <section className={styles.storyBand}>
        <div className="bh-container">
          <blockquote className={styles.quote}>
            &ldquo;We never set out to be the biggest. We set out to know every building better than
            the person selling it.&rdquo;
          </blockquote>
          <div className={styles.quoteAttribution}>Founding principle, betterhomes, 1986</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="bh-container">
          <div className="bh-eyebrow">Our story</div>
          <h2 className={styles.sectionTitle}>Four decades, one city.</h2>
          <div className={styles.timeline}>
            {MILESTONES.map((m) => (
              <div key={m.year} className={styles.timelineRow}>
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineBody}>
                  <div className={styles.timelineTitle}>{m.title}</div>
                  <p>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="bh-container">
          <div className="bh-eyebrow">How we work</div>
          <h2 className={styles.sectionTitle}>What forty years actually taught us.</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <i className={`ph ph-${v.icon}`} aria-hidden />
                <div className={styles.valueTitle}>{v.title}</div>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`bh-container ${styles.ctaInner}`}>
          <EstBadge color="#fff" size={22} />
          <h2 className={styles.ctaTitle}>Ready to work with someone who knows the building?</h2>
          <div className={styles.ctaActions}>
            <Button href="/properties-for-sale" variant="primary" iconRight="arrow-right">
              Browse listings
            </Button>
            <Button href="/careers" variant="onDarkSecondary">
              See open roles
            </Button>
          </div>
        </div>
      </section>

      <div className={styles.footNote}>
        <div className="bh-container">
          <p>
            Have a question we haven&apos;t answered here? <Link href="/contact">Get in touch</Link>{" "}
            and a specialist will reply within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}
