import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PropertyExplorer } from "@/components/PropertyExplorer";
import styles from "../listing-header.module.css";

export const metadata: Metadata = {
  title: "Properties for Rent in Dubai — betterhomes",
  description: "Browse apartments, villas, and townhouses for rent across Dubai, yearly and furnished options.",
};

export default function PropertiesForRentPage() {
  return (
    <div>
      <div className={styles.header}>
        <div className="bh-container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Properties for Rent</span>
          </nav>
          <div className="bh-eyebrow">Rent</div>
          <h1 className={styles.title}>Properties for rent in Dubai.</h1>
          <p className={styles.subtitle}>
            Furnished and unfurnished apartments, villas, and townhouses on yearly leases &mdash;
            filter below, or just tell us what you&apos;re looking for.
          </p>
        </div>
      </div>
      <Suspense fallback={null}>
        <PropertyExplorer dealType="Rent" />
      </Suspense>
    </div>
  );
}
