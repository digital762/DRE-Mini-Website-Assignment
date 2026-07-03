// Stand-in photography. Real property photography wasn't available for this
// demo, so listing photos are deterministic, keyword-matched placeholders —
// LoremFlickr for property/interior shots (same seed always returns the same
// image, and keywords keep results looking like real estate rather than
// arbitrary stock photography), and Pravatar for agent portraits. Both are
// public, stable, hotlink-friendly placeholder services.

function seedToLock(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % 100000;
}

export function propertyPhoto(seed: string, keywords: string, width = 1200, height = 900): string {
  const kw = encodeURIComponent(keywords);
  return `https://loremflickr.com/${width}/${height}/${kw}?lock=${seedToLock(seed)}`;
}

export function agentAvatar(seed: string, size = 300): string {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}
