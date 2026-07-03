"use client";

import Link from "next/link";
import { useState } from "react";
import type { Listing } from "@/lib/types";
import { formatAED, formatDate } from "@/lib/format";
import { agentAvatar } from "@/lib/images";
import { FavouriteButton } from "./FavouriteButton";
import { CompareCheckbox } from "./CompareCheckbox";
import { Badge } from "./Badge";
import styles from "./PropertyRow.module.css";

export function PropertyRow({ listing }: { listing: Listing }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = listing.gallery.length ? listing.gallery : [{ label: "Photo", url: listing.photo }];
  const isRent = listing.dealType === "Rent";
  const bedsLabel = listing.beds === 0 ? "Studio" : listing.beds;

  const waNumber = listing.agent.phone.replace(/[^\d]/g, "");
  const waMessage = encodeURIComponent(`Hi ${listing.agent.name}, I'm interested in ${listing.title}.`);

  function step(delta: number, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex((i) => (i + delta + photos.length) % photos.length);
  }

  return (
    <article className={styles.row}>
      <Link href={`/listings/${listing.id}`} className={styles.photoLink}>
        <div className={styles.photoWrap}>
          <div
            className={styles.photo}
            style={{ backgroundImage: `url(${photos[photoIndex].url})` }}
          />
          <div className={styles.verified}>
            <i className="ph-fill ph-seal-check" aria-hidden /> Verified listing
          </div>
          {photos.length > 1 && (
            <>
              <button type="button" className={styles.navBtn + " " + styles.navPrev} onClick={(e) => step(-1, e)} aria-label="Previous photo">
                <i className="ph ph-caret-left" aria-hidden />
              </button>
              <button type="button" className={styles.navBtn + " " + styles.navNext} onClick={(e) => step(1, e)} aria-label="Next photo">
                <i className="ph ph-caret-right" aria-hidden />
              </button>
              <div className={styles.dots}>
                {photos.map((_, i) => (
                  <span key={i} className={i === photoIndex ? styles.dotActive : styles.dot} />
                ))}
              </div>
            </>
          )}
        </div>
      </Link>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <div className={styles.price}>
            {formatAED(listing.price)}
            {isRent && <span className={styles.freq}> {listing.rentFrequency ?? "Yearly"}</span>}
          </div>
          <div className={styles.topActions}>
            <FavouriteButton listingId={listing.id} size="sm" />
          </div>
        </div>

        <div className={styles.specsRow}>
          <span>
            <i className="ph ph-bed" aria-hidden /> {bedsLabel}
          </span>
          <span>
            <i className="ph ph-bathtub" aria-hidden /> {listing.baths}
          </span>
          <span>
            <i className="ph ph-cube" aria-hidden /> {listing.sqft.toLocaleString()} sqft
          </span>
          {listing.tag && <Badge variant="sand">{listing.tag}</Badge>}
          {isRent && listing.furnished && <Badge variant="outline">{listing.furnished}</Badge>}
        </div>

        <Link href={`/listings/${listing.id}`} className={styles.titleLink}>
          {listing.title}
        </Link>

        <div className={styles.locationRow}>
          <i className="ph ph-map-pin" aria-hidden />
          {listing.subCommunity ? `${listing.subCommunity}, ` : ""}
          {listing.community}, Dubai
        </div>

        <div className={styles.freshness}>
          <i className="ph ph-clock" aria-hidden /> Listed on {formatDate(listing.listedOn)}
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.agentTag}>
            <span
              className={styles.agentAvatar}
              style={{ backgroundImage: `url(${agentAvatar(listing.agent.email)})` }}
            />
            {listing.agent.name}
          </div>

          <div className={styles.contactButtons}>
            <a href={`mailto:${listing.agent.email}`} className={styles.contactBtn}>
              <i className="ph ph-envelope-simple" aria-hidden /> Email
            </a>
            <a href={`tel:${listing.agent.phone.replace(/\s+/g, "")}`} className={styles.contactBtn}>
              <i className="ph ph-phone" aria-hidden /> Call
            </a>
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactBtn} ${styles.whatsapp}`}
            >
              <i className="ph ph-whatsapp-logo" aria-hidden /> WhatsApp
            </a>
            <CompareCheckbox listingId={listing.id} />
          </div>
        </div>
      </div>
    </article>
  );
}
