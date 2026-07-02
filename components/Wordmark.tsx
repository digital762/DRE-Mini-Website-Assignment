type WordmarkProps = {
  color?: string;
  height?: number;
  className?: string;
};

// betterhomes wordmark, recolored via CSS mask so it can sit on light or
// dark surfaces without shipping multiple asset colors.
export function Wordmark({ color = "var(--bh-slate-blue)", height = 20, className }: WordmarkProps) {
  return (
    <span
      role="img"
      aria-label="betterhomes"
      className={className}
      style={{
        display: "inline-block",
        height,
        width: height * (449 / 69),
        backgroundColor: color,
        WebkitMask: 'url("/images/logos/betterhomes-wordmark.svg") left center / contain no-repeat',
        mask: 'url("/images/logos/betterhomes-wordmark.svg") left center / contain no-repeat',
      }}
    />
  );
}

type EstBadgeProps = {
  color?: string;
  size?: number;
  className?: string;
};

export function EstBadge({ color = "var(--bh-slate-blue)", size = 16, className }: EstBadgeProps) {
  const width = size * (489 / 98);
  return (
    <span
      role="img"
      aria-label="Established 1986"
      className={className}
      style={{
        display: "inline-block",
        width,
        height: size,
        backgroundColor: color,
        WebkitMask: 'url("/images/logos/est-1986.svg") center / contain no-repeat',
        mask: 'url("/images/logos/est-1986.svg") center / contain no-repeat',
      }}
    />
  );
}

type TaglineProps = {
  color?: string;
  height?: number;
  className?: string;
};

export function Tagline({ color = "var(--bh-slate-blue)", height = 12, className }: TaglineProps) {
  return (
    <span
      role="img"
      aria-label="Trust Better. Get Better."
      className={className}
      style={{
        display: "inline-block",
        height,
        width: height * (5231 / 367),
        backgroundColor: color,
        WebkitMask: 'url("/images/logos/tagline-trust-better.png") left center / contain no-repeat',
        mask: 'url("/images/logos/tagline-trust-better.png") left center / contain no-repeat',
      }}
    />
  );
}
