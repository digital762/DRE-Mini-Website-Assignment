import Link from "next/link";
import { Wordmark, Tagline, EstBadge } from "./Wordmark";
import styles from "./SiteFooter.module.css";

const COLUMNS: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Buy",
    items: [
      { label: "Apartments", href: "/properties-for-sale?type=Apartment" },
      { label: "Villas", href: "/properties-for-sale?type=Villa" },
      { label: "Townhouses", href: "/properties-for-sale?type=Townhouse" },
      { label: "Penthouses", href: "/properties-for-sale?type=Penthouse" },
      { label: "All properties for sale", href: "/properties-for-sale" },
    ],
  },
  {
    title: "Rent",
    items: [
      { label: "Apartments", href: "/properties-for-rent?type=Apartment" },
      { label: "Villas", href: "/properties-for-rent?type=Villa" },
      { label: "Townhouses", href: "/properties-for-rent?type=Townhouse" },
      { label: "All properties for rent", href: "/properties-for-rent" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Mortgage calculator", href: "/mortgage-calculator" },
      { label: "Compare properties", href: "/compare" },
      { label: "Favourites", href: "/favourites" },
    ],
  },
  {
    title: "Communities",
    items: [
      { label: "Dubai Marina", href: "/properties-for-sale?community=Dubai%20Marina" },
      { label: "Downtown Dubai", href: "/properties-for-sale?community=Downtown%20Dubai" },
      { label: "Palm Jumeirah", href: "/properties-for-sale?community=Palm%20Jumeirah" },
      { label: "Business Bay", href: "/properties-for-sale?community=Business%20Bay" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/#why-betterhomes" },
      { label: "Agents", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIALS = ["instagram-logo", "linkedin-logo", "whatsapp-logo", "youtube-logo", "tiktok-logo"];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`bh-container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.lockup}>
              <Wordmark color="#fff" height={24} />
              <Tagline color="rgba(255,255,255,0.85)" height={11} />
            </div>
            <p className={styles.blurb}>
              It began at a small desk in Linda&apos;s dining room. Forty years on, we&apos;re
              Dubai&apos;s homegrown residential broker.
            </p>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a key={s} href="#" aria-label={s} className={styles.socialLink}>
                  <i className={`ph ph-${s}`} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className={styles.colTitle}>{col.title}</div>
              <div className={styles.colLinks}>
                {col.items.map((item) => (
                  <Link key={item.label} href={item.href} className={styles.colLink}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          <span>&copy; {new Date().getFullYear()} Betterhomes LLC &middot; RERA #1234 &middot; Dubai, UAE</span>
          <EstBadge color="rgba(255,255,255,0.85)" size={16} />
        </div>
      </div>
    </footer>
  );
}
