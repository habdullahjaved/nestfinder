"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface NeighbourhoodSummaryProps {
  neighbourhood: string;
  city: string;
}

export function NeighbourhoodSummary({
  neighbourhood,
  city,
}: NeighbourhoodSummaryProps) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchSummary() {
      setLoading(true);
      setSummary("");

      const res = await fetch("/api/neighbourhood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ neighbourhood, city }),
      });

      if (!res.body || cancelled) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done || cancelled) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.replace("data: ", "").trim();
          if (data === "[DONE]") break;
          try {
            const json = JSON.parse(data);
            const text = json.choices?.[0]?.delta?.content ?? "";
            if (text && !cancelled) setSummary((prev) => prev + text);
          } catch {}
        }
      }

      if (!cancelled) setLoading(false);
    }

    fetchSummary();
    return () => {
      cancelled = true;
    };
  }, [neighbourhood, city]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-accent" />
        <h2 className="font-syne text-lg font-bold text-primary">
          About {neighbourhood}
        </h2>
      </div>

      {loading && !summary ? (
        <div className="flex flex-col gap-2">
          {[80, 95, 70].map((w, i) => (
            <div
              key={i}
              className="h-3 animate-pulse rounded bg-muted"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {summary}
          {loading && (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-muted-foreground" />
          )}
        </p>
      )}
    </div>
  );
}
