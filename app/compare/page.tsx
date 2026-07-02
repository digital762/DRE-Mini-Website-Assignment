"use client";

import Link from "next/link";
import { useCompare } from "@/lib/providers";
import { getListingById } from "@/lib/listings";
import { formatAED, formatPricePerSqft } from "@/lib/format";
import { FavouriteButton } from "@/components/FavouriteButton";
import { Button } from "@/components/Button";
import styles from "./page.module.css";

export default function ComparePage() {
  const { ids, remove, clear, count } = useCompare();
  const listings = ids.map((id) => getListingById(id)).filter((l): l is NonNullable<typeof l> => Boolean(l));

  if (count === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className="bh-container">
          <div className="bh-eyebrow">Compare</div>
          <h1 className={styles.emptyTitle}>Nothing to compare yet.</h1>
          <p className={styles.emptySub}>
            Tick &ldquo;Compare&rdquo; on any listing card to line properties up side by side.
          </p>
          <Button href="/properties-for-sale" variant="primary" iconRight="arrow-right">
            Browse listings
          </Button>
        </div>
      </div>
    );
  }

  const allAmenities = Array.from(new Set(listings.flatMap((l) => l.amenities))).sort();

  return (
    <div className={styles.page}>
      <div className="bh-container">
        <div className={styles.headerRow}>
          <div>
            <div className="bh-eyebrow">Compare</div>
            <h1 className={styles.title}>
              {count} {count === 1 ? "property" : "properties"} side by side.
            </h1>
          </div>
          <button type="button" className={styles.clearBtn} onClick={clear}>
            Clear all
          </button>
        </div>
        {count === 1 && (
          <p className={styles.hint}>Add another property from the listings page for a fuller comparison.</p>
        )}

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.rowLabelCell}>&nbsp;</th>
                {listings.map((listing) => (
                  <th key={listing.id} className={styles.colHead}>
                    <div className={styles.photo} style={{ backgroundImage: `url(${listing.photo})` }} />
                    <div className={styles.colActions}>
                      <FavouriteButton listingId={listing.id} size="sm" />
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => remove(listing.id)}
                        aria-label={`Remove ${listing.title}`}
                      >
                        <i className="ph ph-x" aria-hidden />
                      </button>
                    </div>
                    <Link href={`/listings/${listing.id}`} className={styles.colTitle}>
                      {listing.title}
                    </Link>
                    <div className={styles.colMeta}>{listing.community}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className={styles.rowLabelCell}>Price</th>
                {listings.map((l) => (
                  <td key={l.id} className={styles.priceCell}>
                    {formatAED(l.price)}
                  </td>
                ))}
              </tr>
              <tr>
                <th className={styles.rowLabelCell}>Price / sqft</th>
                {listings.map((l) => (
                  <td key={l.id}>{formatPricePerSqft(l.price, l.sqft)}</td>
                ))}
              </tr>
              <tr>
                <th className={styles.rowLabelCell}>Type</th>
                {listings.map((l) => (
                  <td key={l.id}>{l.type}</td>
                ))}
              </tr>
              <tr>
                <th className={styles.rowLabelCell}>Status</th>
                {listings.map((l) => (
                  <td key={l.id}>{l.status === "Off-plan" ? "Off-plan" : "Ready"}</td>
                ))}
              </tr>
              <tr>
                <th className={styles.rowLabelCell}>Bedrooms</th>
                {listings.map((l) => (
                  <td key={l.id}>{l.beds}</td>
                ))}
              </tr>
              <tr>
                <th className={styles.rowLabelCell}>Bathrooms</th>
                {listings.map((l) => (
                  <td key={l.id}>{l.baths}</td>
                ))}
              </tr>
              <tr>
                <th className={styles.rowLabelCell}>Size</th>
                {listings.map((l) => (
                  <td key={l.id}>{l.sqft.toLocaleString()} sqft</td>
                ))}
              </tr>
              <tr>
                <th className={styles.rowLabelCell}>Agent</th>
                {listings.map((l) => (
                  <td key={l.id}>{l.agent.name}</td>
                ))}
              </tr>

              <tr className={styles.sectionRow}>
                <th className={styles.rowLabelCell} colSpan={listings.length + 1}>
                  Amenities
                </th>
              </tr>
              {allAmenities.map((amenity) => (
                <tr key={amenity}>
                  <th className={styles.rowLabelCell}>{amenity}</th>
                  {listings.map((l) => (
                    <td key={l.id} className={styles.checkCell}>
                      {l.amenities.includes(amenity) ? (
                        <i className={`ph ph-check-circle ${styles.yes}`} aria-hidden />
                      ) : (
                        <i className={`ph ph-minus ${styles.no}`} aria-hidden />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
