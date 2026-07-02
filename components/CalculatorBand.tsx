import { Button } from "./Button";
import styles from "./CalculatorBand.module.css";

export function CalculatorBand() {
  return (
    <section className={styles.section}>
      <div className={`bh-container ${styles.inner}`}>
        <div className={styles.iconWrap}>
          <i className="ph ph-calculator" aria-hidden />
        </div>
        <div className={styles.copy}>
          <h2 className={styles.heading}>Work out the monthly number first.</h2>
          <p className={styles.sub}>
            Model your down payment, interest rate, and loan term before you call an agent.
          </p>
        </div>
        <Button href="/mortgage-calculator" variant="primary" iconRight="arrow-right">
          Open mortgage calculator
        </Button>
      </div>
    </section>
  );
}
