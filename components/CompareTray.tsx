"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "@/lib/providers";
import { getListingById } from "@/lib/listings";
import styles from "./CompareTray.module.css";

export function CompareTray() {
  const pathname = usePathname();
  const { ids, remove, clear, count } = useCompare();

  if (count === 0 || pathname === "/compare") return null;

  const listings = ids.map((id) => getListingById(id)).filter(Boolean);

  return (
    <div className={styles.tray}>
      <div className={`bh-container ${styles.inner}`}>
        <div className={styles.chips}>
          {listings.map((listing) => (
            <div key={listing!.id} className={styles.chip} style={{ background: listing!.gradient }}>
              <span>{listing!.title}</span>
              <button
                type="button"
                aria-label={`Remove ${listing!.title} from compare`}
                onClick={() => remove(listing!.id)}
              >
                <i className="ph ph-x" aria-hidden />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.clear} onClick={clear}>
            Clear
          </button>
          <Link href="/compare" className={styles.compareBtn}>
            Compare ({count})
          </Link>
        </div>
      </div>
    </div>
  );
}
