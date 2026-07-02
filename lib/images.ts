// Stand-in photography. Real property photography wasn't available for this
// demo, so listing photos are deterministic placeholders keyed by listing id
// (same id always returns the same image) via Lorem Picsum, and agent
// portraits via Pravatar — both public, stable, hotlink-friendly placeholder
// services.

export function propertyPhoto(seed: string, width = 1200, height = 900): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export function agentAvatar(seed: string, size = 300): string {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}
