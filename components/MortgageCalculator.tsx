"use client";

import { useMemo, useState } from "react";
import { calculateMortgage } from "@/lib/mortgage";
import { formatAED, formatNumber } from "@/lib/format";
import styles from "./MortgageCalculator.module.css";

type DownPaymentMode = "%" | "AED";

export function MortgageCalculator({
  initialPrice = 2000000,
  compact = false,
}: {
  initialPrice?: number;
  compact?: boolean;
}) {
  const [price, setPrice] = useState(initialPrice);
  const [downMode, setDownMode] = useState<DownPaymentMode>("%");
  const [downValue, setDownValue] = useState(20);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);

  const downPaymentAED = downMode === "%" ? (price * downValue) / 100 : downValue;
  const downPaymentPercent = price > 0 ? (downPaymentAED / price) * 100 : 0;

  function switchMode(mode: DownPaymentMode) {
    if (mode === downMode) return;
    if (mode === "AED") {
      setDownValue(Math.round(downPaymentAED));
    } else {
      setDownValue(Math.round(downPaymentPercent * 10) / 10);
    }
    setDownMode(mode);
  }

  const result = useMemo(
    () =>
      calculateMortgage({
        price,
        downPaymentAED: Math.min(Math.max(downPaymentAED, 0), price),
        annualRatePercent: rate,
        termYears: term,
      }),
    [price, downPaymentAED, rate, term]
  );

  return (
    <div className={[styles.wrap, compact ? styles.compact : ""].filter(Boolean).join(" ")}>
      <div className={styles.inputs}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Property price (AED)</span>
          <input
            type="number"
            min={0}
            step={10000}
            value={price}
            onChange={(e) => setPrice(Math.max(Number(e.target.value) || 0, 0))}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Down payment
            <span className={styles.modeToggle}>
              {(["%", "AED"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={mode === downMode ? styles.modeActive : styles.mode}
                  onClick={() => switchMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </span>
          </span>
          <input
            type="number"
            min={0}
            max={downMode === "%" ? 100 : price}
            step={downMode === "%" ? 1 : 10000}
            value={downValue}
            onChange={(e) => setDownValue(Math.max(Number(e.target.value) || 0, 0))}
          />
          <span className={styles.hint}>
            {downMode === "%" ? formatAED(downPaymentAED) : `${downPaymentPercent.toFixed(1)}%`} of price
          </span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Interest rate (% p.a.)</span>
          <input
            type="number"
            min={0}
            max={20}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Math.max(Number(e.target.value) || 0, 0))}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Loan term (years)</span>
          <input
            type="number"
            min={1}
            max={30}
            step={1}
            value={term}
            onChange={(e) => setTerm(Math.min(Math.max(Number(e.target.value) || 1, 1), 30))}
          />
        </label>
      </div>

      <div className={styles.results}>
        <div className={styles.resultPrimary}>
          <span className={styles.resultLabel}>Estimated monthly payment</span>
          <span className={styles.resultValue}>{formatAED(result.monthlyPayment)}</span>
        </div>
        <div className={styles.resultGrid}>
          <div className={styles.resultCell}>
            <span className={styles.resultLabel}>Loan amount</span>
            <span className={styles.resultSecondary}>{formatAED(result.loanAmount)}</span>
          </div>
          <div className={styles.resultCell}>
            <span className={styles.resultLabel}>Total interest</span>
            <span className={styles.resultSecondary}>{formatAED(result.totalInterest)}</span>
          </div>
          <div className={styles.resultCell}>
            <span className={styles.resultLabel}>Total repaid</span>
            <span className={styles.resultSecondary}>{formatAED(result.totalPaid)}</span>
          </div>
        </div>
      </div>

      {!compact && (
        <div className={styles.scheduleWrap}>
          <div className={styles.scheduleHeading}>Amortization summary, by year</div>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Principal paid</th>
                  <th>Interest paid</th>
                  <th>Remaining balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{formatNumber(row.principalPaid)}</td>
                    <td>{formatNumber(row.interestPaid)}</td>
                    <td>{formatNumber(row.remainingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
