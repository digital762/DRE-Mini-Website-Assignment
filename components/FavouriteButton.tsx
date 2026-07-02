"use client";

import { useFavourites } from "@/lib/providers";
import styles from "./FavouriteButton.module.css";

export function FavouriteButton({
  listingId,
  size = "md",
}: {
  listingId: string;
  size?: "sm" | "md";
}) {
  const { has, toggle } = useFavourites();
  const saved = has(listingId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(listingId);
      }}
      className={[styles.btn, styles[size], saved ? styles.saved : ""].filter(Boolean).join(" ")}
      aria-pressed={saved}
      aria-label={saved ? "Remove from favourites" : "Save to favourites"}
    >
      <i className={`ph ${saved ? "ph-fill ph-heart" : "ph-heart"}`} aria-hidden />
    </button>
  );
}
