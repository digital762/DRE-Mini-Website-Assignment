export type AmortizationYear = {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
};

export type MortgageResult = {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  schedule: AmortizationYear[];
};

export function calculateMortgage({
  price,
  downPaymentAED,
  annualRatePercent,
  termYears,
}: {
  price: number;
  downPaymentAED: number;
  annualRatePercent: number;
  termYears: number;
}): MortgageResult {
  const loanAmount = Math.max(price - downPaymentAED, 0);
  const months = Math.max(Math.round(termYears * 12), 1);
  const monthlyRate = annualRatePercent / 100 / 12;

  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / months
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const schedule: AmortizationYear[] = [];
  let balance = loanAmount;
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let month = 1; month <= months; month++) {
    const interestPortion = balance * monthlyRate;
    const principalPortion = Math.min(monthlyPayment - interestPortion, balance);
    balance = Math.max(balance - principalPortion, 0);
    yearPrincipal += principalPortion;
    yearInterest += interestPortion;

    if (month % 12 === 0 || month === months) {
      schedule.push({
        year: Math.ceil(month / 12),
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        remainingBalance: balance,
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - loanAmount;

  return {
    loanAmount,
    monthlyPayment: Number.isFinite(monthlyPayment) ? monthlyPayment : 0,
    totalInterest: Number.isFinite(totalInterest) ? totalInterest : 0,
    totalPaid: Number.isFinite(totalPaid) ? totalPaid : 0,
    schedule,
  };
}
