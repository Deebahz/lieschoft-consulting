"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, RefreshCw } from "lucide-react";
import type { StockQuote } from "@/lib/marketData";

interface MarketResponse {
  quotes?: StockQuote[];
  error?: string;
}

const refreshInterval = 60_000;

function formatPrice(quote: StockQuote) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: quote.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(quote.price);
}

export default function LiveMarketBoard() {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function refreshQuotes() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/market", { cache: "no-store" });
        const result = (await response.json()) as MarketResponse;
        if (!response.ok || !result.quotes) {
          throw new Error(result.error || "Market data is temporarily unavailable.");
        }

        if (active) {
          setQuotes(result.quotes);
          setUpdatedAt(new Date());
          setError(null);
        }
      } catch {
        if (active) {
          setError("Market data is temporarily unavailable.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void refreshQuotes();
    const intervalId = window.setInterval(() => void refreshQuotes(), refreshInterval);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [refreshKey]);

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_70px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-300">
            <Activity size={16} aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Market watch</p>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white">Stocks in focus</h2>
        </div>
        <button
          type="button"
          onClick={() => setRefreshKey((current) => current + 1)}
          aria-label="Refresh stock quotes"
          title="Refresh stock quotes"
          className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          <RefreshCw size={16} aria-hidden="true" className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="mt-6 divide-y divide-white/10">
        {quotes.map((quote) => {
          const isPositive = quote.changePercent === null || quote.changePercent >= 0;
          const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

          return (
            <div key={quote.symbol} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="font-semibold text-white">{quote.symbol}</p>
                <p className="truncate text-sm text-slate-400">{quote.company}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-semibold tabular-nums text-white">{formatPrice(quote)}</p>
                <p className={`mt-1 flex items-center justify-end gap-1 text-sm tabular-nums ${isPositive ? "text-emerald-300" : "text-rose-300"}`}>
                  <ChangeIcon size={14} aria-hidden="true" />
                  {quote.changePercent === null ? "--" : `${quote.changePercent >= 0 ? "+" : ""}${quote.changePercent.toFixed(2)}%`}
                </p>
              </div>
            </div>
          );
        })}

        {quotes.length === 0 && (
          <p className="py-8 text-sm text-slate-300" role="status">
            {isLoading ? "Loading market quotes…" : error}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
        <span>{error && quotes.length > 0 ? "Showing last available quotes" : "Quotes may be delayed"}</span>
        <span>{updatedAt ? `Updated ${updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Yahoo Finance"}</span>
      </div>
      {error && quotes.length > 0 ? <p className="sr-only" role="status">{error}</p> : null}
    </div>
  );
}