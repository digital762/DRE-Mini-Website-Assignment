import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LISTINGS, getListingById } from "@/lib/listings";
import { formatAED, formatPricePerSqft, formatDate, formatNumber } from "@/lib/format";
import { PhotoGallery } from "@/components/PhotoGallery";
import { FavouriteButton } from "@/components/FavouriteButton";
import { CompareCheckbox } from "@/components/CompareCheckbox";
import { Badge } from "@/components/Badge";
import { AgentCard } from "@/components/AgentCard";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { Button } from "@/components/Button";
import styles from "./page.module.css";

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ id: listing.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return {};
  return {
    title: `${listing.title} — betterhomes`,
    description: listing.description,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const isRent = listing.dealType === "Rent";
  const listingsHref = isRent ? "/properties-for-rent" : "/properties-for-sale";
  const bedsLabel = listing.beds === 0 ? "Studio" : `${listing.beds} bedrooms`;
  const waNumber = listing.agent.phone.replace(/[^\d]/g, "");
  const waMessage = encodeURIComponent(`Hi ${listing.agent.name}, I'm interested in ${listing.title}.`);

  return (
    <div className={styles.page}>
      <div className={`bh-container ${styles.breadcrumbRow}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={listingsHref}>{isRent ? "Properties for Rent" : "Properties for Sale"}</Link>
          <span>/</span>
          <Link href={`${listingsHref}?community=${encodeURIComponent(listing.community)}`}>
            {listing.community}
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{listing.title}</span>
        </nav>
      </div>

      <div className={`bh-container ${styles.layout}`}>
        <div className={styles.main}>
          <PhotoGallery photos={listing.gallery} />

          <div className={styles.titleRow}>
            <div>
              <div className={styles.badgeRow}>
                <Badge variant="outline">
                  {isRent ? "For rent" : listing.status === "Off-plan" ? "Off-plan" : "For sale"}
                </Badge>
                {isRent && listing.furnished && <Badge variant="outline">{listing.furnished}</Badge>}
                {listing.tag && <Badge variant="salmon">{listing.tag}</Badge>}
              </div>
              <h1 className={styles.title}>{listing.title}</h1>
              <div className={styles.meta}>
                <i className="ph ph-map-pin" aria-hidden /> {listing.community}
                {listing.subCommunity ? `, ${listing.subCommunity}` : ""} &middot; {listing.type}
              </div>
            </div>
            <div className={styles.titleActions}>
              <FavouriteButton listingId={listing.id} />
              <CompareCheckbox listingId={listing.id} />
            </div>
          </div>

          <div className={styles.priceRow}>
            <div className={styles.price}>
              {formatAED(listing.price)}
              {isRent && <span className={styles.perYear}> {listing.rentFrequency ?? "Yearly"}</span>}
            </div>
            {!isRent && (
              <div className={styles.pricePerSqft}>{formatPricePerSqft(listing.price, listing.sqft)}</div>
            )}
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statCell}>
              <i className="ph ph-bed" aria-hidden />
              <span>{bedsLabel}</span>
            </div>
            <div className={styles.statCell}>
              <i className="ph ph-bathtub" aria-hidden />
              <span>{listing.baths} bathrooms</span>
            </div>
            <div className={styles.statCell}>
              <i className="ph ph-cube" aria-hidden />
              <span>{listing.sqft.toLocaleString()} sqft</span>
            </div>
            <div className={styles.statCell}>
              <i className="ph ph-calendar" aria-hidden />
              <span>Listed {formatDate(listing.listedOn)}</span>
            </div>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.description}>{listing.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Amenities</h2>
            <div className={styles.amenities}>
              {listing.amenities.map((amenity) => (
                <div key={amenity} className={styles.amenity}>
                  <i className="ph ph-check-circle" aria-hidden />
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          {isRent ? (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What to budget for</h2>
              <div className={styles.budgetGrid}>
                <div className={styles.budgetCell}>
                  <span className={styles.budgetLabel}>Security deposit (~5%)</span>
                  <span className={styles.budgetValue}>{formatAED(listing.price * 0.05)}</span>
                </div>
                <div className={styles.budgetCell}>
                  <span className={styles.budgetLabel}>Agency commission (~5%)</span>
                  <span className={styles.budgetValue}>{formatAED(listing.price * 0.05)}</span>
                </div>
                <div className={styles.budgetCell}>
                  <span className={styles.budgetLabel}>DEWA security deposit</span>
                  <span className={styles.budgetValue}>{formatNumber(2000)} (apartment)</span>
                </div>
              </div>
              <p className={styles.budgetNote}>Estimates only &mdash; confirm exact figures with the listing agent.</p>
            </section>
          ) : (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Estimate your monthly payment</h2>
              <MortgageCalculator initialPrice={listing.price} compact />
              <Button href="/mortgage-calculator" variant="ghost" iconRight="arrow-right" className={styles.fullCalcLink}>
                Open the full calculator
              </Button>
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.agentWrap}>
            <div className={styles.sectionTitle}>Listing agent</div>
            <AgentCard agent={listing.agent} />
            <div className={styles.contactRow}>
              <a href={`tel:${listing.agent.phone.replace(/\s+/g, "")}`} className={styles.contactBtn}>
                <i className="ph ph-phone" aria-hidden /> Call
              </a>
              <a
                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactBtn}
              >
                <i className="ph ph-whatsapp-logo" aria-hidden /> WhatsApp
              </a>
            </div>
            <a href={`mailto:${listing.agent.email}`} className={styles.enquireBtn}>
              Enquire about this property
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
