import { getFeaturedListings } from "@/lib/listings";
import { ListingCard } from "./ListingCard";
import { Button } from "./Button";
import styles from "./FeaturedListings.module.css";

export function FeaturedListings() {
  const listings = getFeaturedListings(6);

  return (
    <section className={styles.section}>
      <div className="bh-container">
        <div className={styles.headerRow}>
          <div>
            <div className="bh-eyebrow">Hot properties</div>
            <h2 className={styles.heading}>This week, across the city.</h2>
          </div>
          <Button href="/listings" variant="ghost" iconRight="arrow-right">
            View all listings
          </Button>
        </div>

        <div className={styles.grid}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
