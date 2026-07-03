import { getFeaturedRentals } from "@/lib/listings";
import { ListingCard } from "./ListingCard";
import { Button } from "./Button";
import styles from "./FeaturedRentals.module.css";

export function FeaturedRentals() {
  const listings = getFeaturedRentals(3);

  return (
    <section className={styles.section}>
      <div className="bh-container">
        <div className={styles.headerRow}>
          <div>
            <div className="bh-eyebrow">Ready to move in</div>
            <h2 className={styles.heading}>Renting? These came up recently.</h2>
          </div>
          <Button href="/properties-for-rent" variant="ghost" iconRight="arrow-right">
            See every rental
          </Button>
        </div>

        <div className={styles.gridThree}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
