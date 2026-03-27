"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

interface MortgageCalculatorProps {
  price: number;
}

export function MortgageCalculator({ price }: MortgageCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(4.5);

  const { monthly, total, interest } = useMemo(() => {
    const principal = price * (1 - downPaymentPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;

    if (monthlyRate === 0) {
      const m = principal / n;
      return { monthly: m, total: m * n, interest: 0 };
    }

    const m =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
      (Math.pow(1 + monthlyRate, n) - 1);

    return {
      monthly: m,
      total: m * n,
      interest: m * n - principal,
    };
  }, [price, downPaymentPct, years, rate]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-5">
        <Calculator className="h-4 w-4 text-accent" />
        <h3 className="font-syne text-sm font-bold text-primary">
          Mortgage calculator
        </h3>
      </div>

      {/* Monthly payment highlight */}
      <div className="mb-5 rounded-xl bg-primary p-4 text-center">
        <p className="text-xs text-slate-400 mb-1">Estimated monthly</p>
        <p className="font-syne text-2xl font-extrabold text-white">
          {fmt(monthly)}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Down payment */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Label className="text-xs text-primary">Down payment</Label>
            <span className="text-xs font-medium text-primary">
              {downPaymentPct}% · {fmt((price * downPaymentPct) / 100)}
            </span>
          </div>
          <Slider
            min={5}
            max={80}
            step={5}
            value={[downPaymentPct]}
            onValueChange={([v]) => setDownPaymentPct(v)}
            className="[&>[role=slider]]:bg-slate-900"
          />
        </div>

        {/* Loan term */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Label className="text-xs text-primary">Loan term</Label>
            <span className="text-xs font-medium text-primary">
              {years} years
            </span>
          </div>
          <Slider
            min={5}
            max={30}
            step={5}
            value={[years]}
            onValueChange={([v]) => setYears(v)}
            className="[&>[role=slider]]:bg-slate-900"
          />
        </div>

        {/* Interest rate */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Label className="text-xs text-primary">Interest rate</Label>
            <span className="text-xs font-medium text-primary">{rate}%</span>
          </div>
          <Slider
            min={1}
            max={12}
            step={0.25}
            value={[rate]}
            onValueChange={([v]) => setRate(v)}
            className="[&>[role=slider]]:bg-primary"
          />
        </div>

        {/* Breakdown */}
        <div className="border-t border-sand-100 pt-4 flex flex-col gap-2">
          {[
            {
              label: "Loan amount",
              value: fmt(price * (1 - downPaymentPct / 100)),
            },
            { label: "Total interest", value: fmt(interest) },
            {
              label: "Total cost",
              value: fmt(total + (price * downPaymentPct) / 100),
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-xs">
              <span className="text-sand-500">{label}</span>
              <span className="font-medium text-slate-700">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
