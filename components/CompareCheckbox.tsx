"use client";

import { useCompare } from "@/lib/providers";
import styles from "./CompareCheckbox.module.css";

export function CompareCheckbox({ listingId }: { listingId: string }) {
  const { has, toggle } = useCompare();
  const checked = has(listingId);

  return (
    <label className={[styles.wrap, checked ? styles.checked : ""].filter(Boolean).join(" ")}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
          toggle(listingId);
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <i className={checked ? "ph-fill ph-check-square" : "ph ph-square"} aria-hidden />
      Compare
    </label>
  );
}
