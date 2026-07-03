import styles from "./Testimonials.module.css";

const QUOTES = [
  {
    quote:
      "I'd looked at four buildings on my own before I called betterhomes. My agent had lived in three of them.",
    name: "Aisha K.",
    context: "Bought in Dubai Marina",
  },
  {
    quote: "They told me not to buy the first villa I liked. I bought the third one instead, and I'm glad I waited.",
    name: "Farhan M.",
    context: "Bought in Arabian Ranches",
  },
  {
    quote: "Our lease was up in eleven days. They had three viewings lined up before I'd finished my coffee.",
    name: "Priya D.",
    context: "Rented in Business Bay",
  },
];

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="bh-container">
        <div className="bh-eyebrow">In their words</div>
        <h2 className={styles.heading}>What forty years sounds like from the other side.</h2>

        <div className={styles.grid}>
          {QUOTES.map((t) => (
            <figure key={t.name} className={styles.card}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.context}>{t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
