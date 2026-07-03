"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "./Wordmark";
import { useFavourites, useCompare } from "@/lib/providers";
import styles from "./SiteHeader.module.css";

const NAV_ITEMS = [
  { href: "/properties-for-rent", label: "Rent" },
  { href: "/properties-for-sale", label: "Buy" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const favourites = useFavourites();
  const compare = useCompare();

  return (
    <header className={styles.header}>
      <div className={`bh-container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <Wordmark height={22} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
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
            List your property
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
