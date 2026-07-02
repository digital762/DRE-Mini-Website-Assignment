import { Wordmark, Tagline, EstBadge } from "./Wordmark";
import styles from "./SiteFooter.module.css";

const COLUMNS: { title: string; items: string[] }[] = [
  { title: "Buy", items: ["Apartments", "Villas", "Townhouses", "Penthouses", "All listings"] },
  { title: "Tools", items: ["Mortgage calculator", "Compare properties", "Favourites"] },
  {
    title: "Communities",
    items: ["Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Business Bay"],
  },
  { title: "Company", items: ["About", "Agents", "Careers", "Contact"] },
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
                  <a key={item} href="#" className={styles.colLink}>
                    {item}
                  </a>
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
