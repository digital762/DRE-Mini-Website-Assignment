"use client";

import { useFavourites } from "@/lib/providers";
import { getListingById } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/Button";
import styles from "./page.module.css";

export default function FavouritesPage() {
  const { ids, count } = useFavourites();
  const listings = ids.map((id) => getListingById(id)).filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div className={styles.page}>
      <div className="bh-container">
        <div className="bh-eyebrow">Saved</div>
        <h1 className={styles.title}>Your favourites.</h1>
        <p className={styles.subtitle}>
          Saved to this browser, no account needed. {count > 0 ? `${count} saved so far.` : ""}
        </p>

        {count === 0 ? (
          <div className={styles.empty}>
            <p>Nothing saved yet &mdash; tap the heart on any listing and it&apos;ll turn up here.</p>
            <Button href="/properties-for-sale" variant="primary" iconRight="arrow-right">
              Browse listings
            </Button>
          </div>
        ) : (
          <div className={styles.grid}>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
