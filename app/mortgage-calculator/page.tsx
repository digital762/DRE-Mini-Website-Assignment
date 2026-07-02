import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Mortgage calculator — betterhomes",
  description:
    "Estimate your monthly payment, total interest, and amortization schedule for a Dubai property purchase.",
};

export default function MortgageCalculatorPage() {
  return (
    <div className={styles.page}>
      <div className="bh-container">
        <div className="bh-eyebrow">Tools</div>
        <h1 className={styles.title}>Mortgage calculator.</h1>
        <p className={styles.subtitle}>
          Model a purchase before you talk to a lender. Figures update as you type and are for
          guidance only &mdash; your bank&apos;s offer may vary.
        </p>

        <div className={styles.calcWrap}>
          <MortgageCalculator initialPrice={2000000} />
        </div>
      </div>
    </div>
  );
}
