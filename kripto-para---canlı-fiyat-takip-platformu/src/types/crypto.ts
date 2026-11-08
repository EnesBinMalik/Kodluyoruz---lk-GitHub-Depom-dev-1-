export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  circulating_supply: number;
  total_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export type Currency = 'usd' | 'try' | 'eur';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  locale: string;
}

export type SortField = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h' | 'total_volume' | 'name';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'table' | 'grid';
export type FilterCategory = 'all' | 'top10' | 'gainers' | 'losers' | 'favorites';

export interface GlobalMarketData {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  activeCryptos: number;
  topGainer?: {
    name: string;
    symbol: string;
    change: number;
  };
  topLoser?: {
    name: string;
    symbol: string;
    change: number;
  };
}
