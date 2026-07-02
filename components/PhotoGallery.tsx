"use client";

import { useState } from "react";
import type { GalleryPhoto } from "@/lib/types";
import styles from "./PhotoGallery.module.css";

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);
  const current = photos[active] ?? photos[0];

  return (
    <div className={styles.wrap}>
      <div className={styles.main} style={{ background: current.gradient }}>
        <span className={styles.label}>{current.label}</span>
      </div>
      {photos.length > 1 && (
        <div className={styles.thumbs}>
          {photos.map((photo, i) => (
            <button
              key={`${photo.label}-${i}`}
              type="button"
              className={[styles.thumb, i === active ? styles.thumbActive : ""].filter(Boolean).join(" ")}
              style={{ background: photo.gradient }}
              onClick={() => setActive(i)}
              aria-label={`Show photo: ${photo.label}`}
              aria-current={i === active}
            />
          ))}
        </div>
      )}
    </div>
  );
}
