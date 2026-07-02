"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "./Wordmark";
import { useFavourites, useCompare } from "@/lib/providers";
import styles from "./SiteHeader.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/mortgage-calculator", label: "Mortgage calculator" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const favourites = useFavourites();
  const compare = useCompare();

  return (
    <header className={styles.header}>
      <div className={`bh-container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <Wordmark height={18} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className={styles.navActionsMobile}>
            <Link href="/favourites" className={styles.iconLink} onClick={() => setMenuOpen(false)}>
              <i className="ph ph-heart" aria-hidden />
              Favourites{favourites.count > 0 ? ` (${favourites.count})` : ""}
            </Link>
            <Link href="/compare" className={styles.iconLink} onClick={() => setMenuOpen(false)}>
              <i className="ph ph-scales" aria-hidden />
              Compare{compare.count > 0 ? ` (${compare.count})` : ""}
            </Link>
          </div>
        </nav>

        <div className={styles.actions}>
          <Link href="/favourites" className={styles.iconLink} aria-label="Favourites">
            <span className={styles.iconWrap}>
              <i className="ph ph-heart" aria-hidden />
              {favourites.count > 0 && <span className={styles.count}>{favourites.count}</span>}
            </span>
          </Link>
          <Link href="/compare" className={styles.iconLink} aria-label="Compare">
            <span className={styles.iconWrap}>
              <i className="ph ph-scales" aria-hidden />
              {compare.count > 0 && <span className={styles.count}>{compare.count}</span>}
            </span>
          </Link>
          <a href="mailto:hello@bhomes.com" className={styles.cta}>
            Get in touch
          </a>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <i className={menuOpen ? "ph ph-x" : "ph ph-list"} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
