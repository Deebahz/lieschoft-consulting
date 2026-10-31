export interface StockQuote {
  symbol: string;
  company: string;
  price: number;
  changePercent: number | null;
  quoteTime: number | null;
  currency: string;
}

interface YahooChartResponse {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
        regularMarketTime?: number;
        currency?: string;
      };
    }> | null;
  };
}

const stocks = [
  { symbol: "AAPL", company: "Apple" },
  { symbol: "MSFT", company: "Microsoft" },
  { symbol: "NVDA", company: "NVIDIA" },
];

async function getStockQuote(stock: (typeof stocks)[number]): Promise<StockQuote | null> {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${stock.symbol}?range=1d&interval=1m`,
    {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(8000),
    }
  );

  if (!response.ok) {
    throw new Error(`Quote provider returned ${response.status} for ${stock.symbol}.`);
  }

  const payload = (await response.json()) as YahooChartResponse;
  const meta = payload.chart?.result?.[0]?.meta;
  if (!meta || typeof meta.regularMarketPrice !== "number") {
    return null;
  }

  const previousClose = [meta.chartPreviousClose, meta.previousClose].find(
    (value): value is number => typeof value === "number" && value > 0
  );

  return {
    ...stock,
    price: meta.regularMarketPrice,
    changePercent: previousClose
      ? ((meta.regularMarketPrice - previousClose) / previousClose) * 100
      : null,
    quoteTime: typeof meta.regularMarketTime === "number" ? meta.regularMarketTime : null,
    currency: meta.currency || "USD",
  };
}

export async function getStockQuotes(): Promise<StockQuote[]> {
  const quotes = await Promise.all(
    stocks.map(async (stock) => {
      try {
        return await getStockQuote(stock);
      } catch (error) {
        console.error(`Unable to load quote for ${stock.symbol}:`, error);
        return null;
      }
    })
  );

  return quotes.filter((quote): quote is StockQuote => quote !== null);
}