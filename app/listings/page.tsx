import type { Metadata } from "next";
import { Suspense } from "react";
import { ListingsExplorer } from "@/components/ListingsExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Listings — betterhomes",
  description: "Browse Dubai apartments, villas, townhouses, and penthouses for sale.",
};

export default function ListingsPage() {
  return (
    <div>
      <div className={styles.header}>
        <div className="bh-container">
          <div className="bh-eyebrow">Buy</div>
          <h1 className={styles.title}>Every listing, one map of Dubai.</h1>
          <p className={styles.subtitle}>
            Filter by community, type, and price to find the property that fits.
          </p>
        </div>
      </div>
      <Suspense fallback={null}>
        <ListingsExplorer />
      </Suspense>
    </div>
  );
}
