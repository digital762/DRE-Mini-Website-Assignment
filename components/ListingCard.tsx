import Link from "next/link";
import type { Listing } from "@/lib/types";
import { formatAEDCompact, formatPricePerSqft } from "@/lib/format";
import { FavouriteButton } from "./FavouriteButton";
import { CompareCheckbox } from "./CompareCheckbox";
import { Badge } from "./Badge";
import styles from "./ListingCard.module.css";

export function ListingCard({
  listing,
  layout = "grid",
}: {
  listing: Listing;
  layout?: "grid" | "list";
}) {
  return (
    <article className={[styles.card, layout === "list" ? styles.list : ""].filter(Boolean).join(" ")}>
      <Link href={`/listings/${listing.id}`} className={styles.photoLink}>
        <div className={styles.photo} style={{ background: listing.gradient }}>
          <div className={styles.photoTopRow}>
            <Badge variant="bone">{listing.status === "Off-plan" ? "Off-plan" : "For sale"}</Badge>
            <div className={styles.photoTopRight}>
              <FavouriteButton listingId={listing.id} size="sm" />
            </div>
          </div>
          {listing.tag && (
            <div className={styles.tagRow}>
              <Badge variant="salmon">{listing.tag}</Badge>
            </div>
          )}
          <div className={styles.priceOverlay}>
            <div className={styles.price}>{formatAEDCompact(listing.price)}</div>
            <div className={styles.pricePerSqft}>{formatPricePerSqft(listing.price, listing.sqft)}</div>
          </div>
        </div>
      </Link>

      <div className={styles.body}>
        <Link href={`/listings/${listing.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{listing.title}</h3>
        </Link>
        <div className={styles.meta}>
          {listing.community} &middot; {listing.type}
        </div>

        {layout === "list" && <p className={styles.description}>{listing.description}</p>}

        <div className={styles.statsRow}>
          <span className={styles.stat}>
            <i className="ph ph-bed" aria-hidden /> {listing.beds} bed
          </span>
          <span className={styles.stat}>
            <i className="ph ph-bathtub" aria-hidden /> {listing.baths} bath
          </span>
          <span className={styles.stat}>
            <i className="ph ph-cube" aria-hidden /> {listing.sqft.toLocaleString()} sqft
          </span>
        </div>

        <div className={styles.footerRow}>
          <CompareCheckbox listingId={listing.id} />
        </div>
      </div>
    </article>
  );
}
