import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PropertyExplorer } from "@/components/PropertyExplorer";
import styles from "../listing-header.module.css";

export const metadata: Metadata = {
  title: "Properties for Sale in Dubai — betterhomes",
  description: "Browse apartments, villas, townhouses, and penthouses for sale across Dubai.",
};

export default function PropertiesForSalePage() {
  return (
    <div>
      <div className={styles.header}>
        <div className="bh-container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Properties for Sale</span>
          </nav>
          <div className="bh-eyebrow">Buy</div>
          <h1 className={styles.title}>Properties for sale in Dubai.</h1>
          <p className={styles.subtitle}>
            Apartments, villas, townhouses, and penthouses &mdash; filter by community, type, and
            price, or just tell us what you&apos;re looking for.
          </p>
        </div>
      </div>
      <Suspense fallback={null}>
        <PropertyExplorer dealType="Sale" />
      </Suspense>
    </div>
  );
}
