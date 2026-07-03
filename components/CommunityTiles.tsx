import Link from "next/link";
import { SALE_LISTINGS_ONLY } from "@/lib/listings";
import { propertyPhoto } from "@/lib/images";
import styles from "./CommunityTiles.module.css";

const FEATURED_COMMUNITIES: { name: string; keywords: string }[] = [
  { name: "Dubai Marina", keywords: "marina,skyline,dusk" },
  { name: "Downtown Dubai", keywords: "downtown,skyscraper,city" },
  { name: "Palm Jumeirah", keywords: "beach,resort,palm" },
  { name: "Business Bay", keywords: "business,skyline,modern" },
  { name: "JBR", keywords: "beach,apartment,seaside" },
  { name: "Arabian Ranches", keywords: "villa,desert,luxury" },
];

export function CommunityTiles() {
  return (
    <section className={styles.section}>
      <div className="bh-container">
        <div className="bh-eyebrow">Where to look</div>
        <h2 className={styles.heading}>Neighbourhoods we know street by street.</h2>
        <p className={styles.sub}>
          Our agents specialise by community, not by the whole city at once. Start with the one
          you already have your eye on.
        </p>

        <div className={styles.grid}>
          {FEATURED_COMMUNITIES.map((c) => {
            const count = SALE_LISTINGS_ONLY.filter((l) => l.community === c.name).length;
            return (
              <Link
                key={c.name}
                href={`/properties-for-sale?community=${encodeURIComponent(c.name)}`}
                className={styles.tile}
                style={{ backgroundImage: `url(${propertyPhoto(`community-${c.name}`, c.keywords)})` }}
              >
                <span className={styles.tileName}>{c.name}</span>
                <span className={styles.tileCount}>
                  {count} {count === 1 ? "listing" : "listings"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
