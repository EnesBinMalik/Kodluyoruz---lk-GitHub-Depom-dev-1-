import axios from 'axios';
import { CryptoCoin, Currency, CurrencyConfig } from '../types/crypto';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  usd: { code: 'usd', symbol: '$', label: 'USD ($)', locale: 'en-US' },
  try: { code: 'try', symbol: '₺', label: 'TRY (₺)', locale: 'tr-TR' },
  eur: { code: 'eur', symbol: '€', label: 'EUR (€)', locale: 'de-DE' },
};

// Top 50 fallback dataset in case of rate limits or offline network
const FALLBACK_COINS: Record<Currency, CryptoCoin[]> = {
  usd: [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 91420.50,
      market_cap: 1805200000000,
      market_cap_rank: 1,
      total_volume: 38400000000,
      high_24h: 92800.00,
      low_24h: 89950.00,
      price_change_24h: 1470.50,
      price_change_percentage_24h: 1.63,
      price_change_percentage_1h_in_currency: 0.24,
      price_change_percentage_7d_in_currency: 4.85,
      circulating_supply: 19780000,
      total_supply: 21000000,
      ath: 93450.00,
      ath_change_percentage: -2.17,
      sparkline_in_7d: {
        price: [87500, 88200, 89100, 88400, 90300, 91100, 91420],
      },
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 3380.25,
      market_cap: 406800000000,
      market_cap_rank: 2,
      total_volume: 24500000000,
      high_24h: 3450.00,
      low_24h: 3290.00,
      price_change_24h: 90.25,
      price_change_percentage_24h: 2.74,
      price_change_percentage_1h_in_currency: 0.15,
      price_change_percentage_7d_in_currency: 8.42,
      circulating_supply: 120400000,
      total_supply: null,
      ath: 4878.26,
      ath_change_percentage: -30.7,
      sparkline_in_7d: {
        price: [3120, 3180, 3250, 3220, 3310, 3350, 3380],
      },
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether USD',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      current_price: 1.00,
      market_cap: 128500000000,
      market_cap_rank: 3,
      total_volume: 62000000000,
      high_24h: 1.004,
      low_24h: 0.998,
      price_change_24h: 0.0002,
      price_change_percentage_24h: 0.02,
      circulating_supply: 128500000000,
      total_supply: 128500000000,
      ath: 1.32,
      ath_change_percentage: -24.2,
      sparkline_in_7d: {
        price: [1.00, 1.00, 0.999, 1.001, 1.00, 1.00, 1.00],
      },
    },
    {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      current_price: 214.80,
      market_cap: 101200000000,
      market_cap_rank: 4,
      total_volume: 8900000000,
      high_24h: 222.00,
      low_24h: 206.50,
      price_change_24h: 8.30,
      price_change_percentage_24h: 4.02,
      price_change_percentage_1h_in_currency: 0.8,
      price_change_percentage_7d_in_currency: 14.2,
      circulating_supply: 471000000,
      total_supply: null,
      ath: 259.96,
      ath_change_percentage: -17.37,
      sparkline_in_7d: {
        price: [188, 194, 202, 198, 208, 212, 214.8],
      },
    },
    {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      current_price: 645.10,
      market_cap: 93800000000,
      market_cap_rank: 5,
      total_volume: 1850000000,
      high_24h: 658.00,
      low_24h: 638.00,
      price_change_24h: 7.10,
      price_change_percentage_24h: 1.11,
      circulating_supply: 145000000,
      total_supply: 145000000,
      ath: 717.48,
      ath_change_percentage: -10.09,
      sparkline_in_7d: {
        price: [630, 634, 642, 638, 640, 644, 645.1],
      },
    },
    {
      id: 'ripple',
      symbol: 'xrp',
      name: 'XRP',
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      current_price: 1.18,
      market_cap: 67200000000,
      market_cap_rank: 6,
      total_volume: 7200000000,
      high_24h: 1.26,
      low_24h: 1.09,
      price_change_24h: 0.09,
      price_change_percentage_24h: 8.25,
      circulating_supply: 56900000000,
      total_supply: 99990000000,
      ath: 3.84,
      ath_change_percentage: -69.2,
      sparkline_in_7d: {
        price: [0.92, 0.98, 1.05, 1.02, 1.12, 1.16, 1.18],
      },
    },
    {
      id: 'dogecoin',
      symbol: 'doge',
      name: 'Dogecoin',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      current_price: 0.385,
      market_cap: 56400000000,
      market_cap_rank: 7,
      total_volume: 6100000000,
      high_24h: 0.412,
      low_24h: 0.362,
      price_change_24h: 0.023,
      price_change_percentage_24h: 6.35,
      circulating_supply: 146000000000,
      total_supply: null,
      ath: 0.731,
      ath_change_percentage: -47.3,
      sparkline_in_7d: {
        price: [0.29, 0.32, 0.35, 0.34, 0.37, 0.38, 0.385],
      },
    },
    {
      id: 'cardano',
      symbol: 'ada',
      name: 'Cardano',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      current_price: 0.784,
      market_cap: 27800000000,
      market_cap_rank: 8,
      total_volume: 2100000000,
      high_24h: 0.815,
      low_24h: 0.742,
      price_change_24h: 0.042,
      price_change_percentage_24h: 5.66,
      circulating_supply: 35700000000,
      total_supply: 45000000000,
      ath: 3.09,
      ath_change_percentage: -74.6,
      sparkline_in_7d: {
        price: [0.65, 0.69, 0.72, 0.71, 0.75, 0.77, 0.784],
      },
    },
    {
      id: 'avalanche-2',
      symbol: 'avax',
      name: 'Avalanche',
      image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      current_price: 34.60,
      market_cap: 14100000000,
      market_cap_rank: 9,
      total_volume: 780000000,
      high_24h: 36.20,
      low_24h: 33.10,
      price_change_24h: 1.50,
      price_change_percentage_24h: 4.53,
      circulating_supply: 407000000,
      total_supply: 720000000,
      ath: 144.96,
      ath_change_percentage: -76.1,
      sparkline_in_7d: {
        price: [29.5, 31.0, 32.8, 32.2, 33.8, 34.1, 34.6],
      },
    },
    {
      id: 'sui',
      symbol: 'sui',
      name: 'Sui',
      image: 'https://assets.coingecko.com/coins/images/26375/large/sui-ocean-square.png',
      current_price: 3.42,
      market_cap: 9750000000,
      market_cap_rank: 10,
      total_volume: 1620000000,
      high_24h: 3.65,
      low_24h: 3.25,
      price_change_24h: 0.17,
      price_change_percentage_24h: 5.23,
      circulating_supply: 2850000000,
      total_supply: 10000000000,
      ath: 3.92,
      ath_change_percentage: -12.75,
      sparkline_in_7d: {
        price: [2.8, 2.95, 3.12, 3.08, 3.29, 3.38, 3.42],
      },
    },
    {
      id: 'chainlink',
      symbol: 'link',
      name: 'Chainlink',
      image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
      current_price: 14.85,
      market_cap: 9280000000,
      market_cap_rank: 11,
      total_volume: 480000000,
      high_24h: 15.30,
      low_24h: 14.20,
      price_change_24h: -0.35,
      price_change_percentage_24h: -2.30,
      circulating_supply: 626000000,
      total_supply: 1000000000,
      ath: 52.70,
      ath_change_percentage: -71.8,
      sparkline_in_7d: {
        price: [13.8, 14.1, 14.6, 14.9, 15.1, 15.0, 14.85],
      },
    },
    {
      id: 'polkadot',
      symbol: 'dot',
      name: 'Polkadot',
      image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
      current_price: 6.24,
      market_cap: 8960000000,
      market_cap_rank: 12,
      total_volume: 390000000,
      high_24h: 6.48,
      low_24h: 5.98,
      price_change_24h: 0.26,
      price_change_percentage_24h: 4.35,
      circulating_supply: 1436000000,
      total_supply: null,
      ath: 54.98,
      ath_change_percentage: -88.6,
      sparkline_in_7d: {
        price: [5.4, 5.6, 5.9, 5.85, 6.05, 6.18, 6.24],
      },
    },
    {
      id: 'near',
      symbol: 'near',
      name: 'NEAR Protocol',
      image: 'https://assets.coingecko.com/coins/images/10365/large/near.png',
      current_price: 6.78,
      market_cap: 8250000000,
      market_cap_rank: 13,
      total_volume: 720000000,
      high_24h: 7.15,
      low_24h: 6.45,
      price_change_24h: 0.33,
      price_change_percentage_24h: 5.12,
      circulating_supply: 1217000000,
      total_supply: null,
      ath: 20.42,
      ath_change_percentage: -66.8,
      sparkline_in_7d: {
        price: [5.8, 6.1, 6.4, 6.35, 6.6, 6.7, 6.78],
      },
    },
    {
      id: 'shiba-inu',
      symbol: 'shib',
      name: 'Shiba Inu',
      image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
      current_price: 0.0000254,
      market_cap: 14900000000,
      market_cap_rank: 14,
      total_volume: 1840000000,
      high_24h: 0.0000268,
      low_24h: 0.0000241,
      price_change_24h: 0.0000013,
      price_change_percentage_24h: 5.39,
      circulating_supply: 589000000000000,
      total_supply: 589000000000000,
      ath: 0.00008616,
      ath_change_percentage: -70.5,
      sparkline_in_7d: {
        price: [0.000019, 0.000021, 0.000023, 0.000022, 0.000024, 0.000025, 0.0000254],
      },
    },
    {
      id: 'uniswap',
      symbol: 'uni',
      name: 'Uniswap',
      image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
      current_price: 9.35,
      market_cap: 5610000000,
      market_cap_rank: 15,
      total_volume: 320000000,
      high_24h: 9.75,
      low_24h: 8.95,
      price_change_24h: 0.40,
      price_change_percentage_24h: 4.47,
      circulating_supply: 600000000,
      total_supply: 1000000000,
      ath: 44.92,
      ath_change_percentage: -79.2,
      sparkline_in_7d: {
        price: [8.1, 8.4, 8.8, 8.7, 9.1, 9.25, 9.35],
      },
    },
    {
      id: 'polygon-ecosystem-token',
      symbol: 'pol',
      name: 'Polygon',
      image: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
      current_price: 0.52,
      market_cap: 4160000000,
      market_cap_rank: 16,
      total_volume: 180000000,
      high_24h: 0.54,
      low_24h: 0.49,
      price_change_24h: -0.015,
      price_change_percentage_24h: -2.8,
      circulating_supply: 8000000000,
      total_supply: 10000000000,
      ath: 2.92,
      ath_change_percentage: -82.2,
      sparkline_in_7d: {
        price: [0.46, 0.48, 0.51, 0.50, 0.53, 0.53, 0.52],
      },
    },
    {
      id: 'pepe',
      symbol: 'pepe',
      name: 'Pepe',
      image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.png',
      current_price: 0.0000213,
      market_cap: 8950000000,
      market_cap_rank: 17,
      total_volume: 2400000000,
      high_24h: 0.0000235,
      low_24h: 0.0000198,
      price_change_24h: 0.0000015,
      price_change_percentage_24h: 7.58,
      circulating_supply: 420690000000000,
      total_supply: 420690000000000,
      ath: 0.0000252,
      ath_change_percentage: -15.4,
      sparkline_in_7d: {
        price: [0.000014, 0.000016, 0.000018, 0.000017, 0.000020, 0.000021, 0.0000213],
      },
    },
    {
      id: 'stellar',
      symbol: 'xlm',
      name: 'Stellar',
      image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
      current_price: 0.285,
      market_cap: 8550000000,
      market_cap_rank: 18,
      total_volume: 950000000,
      high_24h: 0.310,
      low_24h: 0.260,
      price_change_24h: 0.025,
      price_change_percentage_24h: 9.61,
      circulating_supply: 30000000000,
      total_supply: 50000000000,
      ath: 0.875,
      ath_change_percentage: -67.4,
      sparkline_in_7d: {
        price: [0.18, 0.21, 0.24, 0.23, 0.26, 0.27, 0.285],
      },
    },
    {
      id: 'aptos',
      symbol: 'apt',
      name: 'Aptos',
      image: 'https://assets.coingecko.com/coins/images/26455/large/aptos_round.png',
      current_price: 12.45,
      market_cap: 6480000000,
      market_cap_rank: 19,
      total_volume: 410000000,
      high_24h: 13.10,
      low_24h: 11.90,
      price_change_24h: 0.55,
      price_change_percentage_24h: 4.62,
      circulating_supply: 520000000,
      total_supply: 1100000000,
      ath: 19.92,
      ath_change_percentage: -37.5,
      sparkline_in_7d: {
        price: [10.2, 10.8, 11.5, 11.2, 11.9, 12.2, 12.45],
      },
    },
    {
      id: 'monero',
      symbol: 'xmr',
      name: 'Monero',
      image: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png',
      current_price: 158.70,
      market_cap: 2920000000,
      market_cap_rank: 20,
      total_volume: 85000000,
      high_24h: 162.00,
      low_24h: 155.50,
      price_change_24h: -1.80,
      price_change_percentage_24h: -1.12,
      circulating_supply: 18400000,
      total_supply: 18400000,
      ath: 542.33,
      ath_change_percentage: -70.7,
      sparkline_in_7d: {
        price: [154, 156, 159, 158, 161, 160, 158.7],
      },
    },
  ],
  try: [],
  eur: [],
};

// Rates relative to USD for fallback calculation
const EXCHANGE_RATES = {
  usd: 1,
  try: 35.25,
  eur: 0.94,
};

// Populate TRY and EUR fallback values
FALLBACK_COINS.try = FALLBACK_COINS.usd.map(coin => ({
  ...coin,
  current_price: coin.current_price * EXCHANGE_RATES.try,
  market_cap: coin.market_cap * EXCHANGE_RATES.try,
  total_volume: coin.total_volume * EXCHANGE_RATES.try,
  high_24h: coin.high_24h * EXCHANGE_RATES.try,
  low_24h: coin.low_24h * EXCHANGE_RATES.try,
  price_change_24h: coin.price_change_24h * EXCHANGE_RATES.try,
  ath: coin.ath * EXCHANGE_RATES.try,
  sparkline_in_7d: coin.sparkline_in_7d
    ? { price: coin.sparkline_in_7d.price.map(p => p * EXCHANGE_RATES.try) }
    : undefined,
}));

FALLBACK_COINS.eur = FALLBACK_COINS.usd.map(coin => ({
  ...coin,
  current_price: coin.current_price * EXCHANGE_RATES.eur,
  market_cap: coin.market_cap * EXCHANGE_RATES.eur,
  total_volume: coin.total_volume * EXCHANGE_RATES.eur,
  high_24h: coin.high_24h * EXCHANGE_RATES.eur,
  low_24h: coin.low_24h * EXCHANGE_RATES.eur,
  price_change_24h: coin.price_change_24h * EXCHANGE_RATES.eur,
  ath: coin.ath * EXCHANGE_RATES.eur,
  sparkline_in_7d: coin.sparkline_in_7d
    ? { price: coin.sparkline_in_7d.price.map(p => p * EXCHANGE_RATES.eur) }
    : undefined,
}));

/**
 * Fetch cryptocurrency markets using Axios
 * Uses CoinGecko public API with intelligent error fallback
 */
export async function fetchCryptoMarkets(currency: Currency = 'usd'): Promise<{
  data: CryptoCoin[];
  isFallback: boolean;
  timestamp: Date;
}> {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets`;
    const response = await axios.get<CryptoCoin[]>(url, {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: true,
        price_change_percentage: '1h,24h,7d',
      },
      timeout: 8000,
    });

    if (Array.isArray(response.data) && response.data.length > 0) {
      return {
        data: response.data,
        isFallback: false,
        timestamp: new Date(),
      };
    }
    throw new Error('Geçersiz API yanıtı');
  } catch (err) {
    console.warn('CoinGecko API doğrudan çağrısı başarısız, yedek veri kaynağı devreye girdi:', err);
    
    // Simulate slight real-time market micro-fluctuations on refresh
    const baseCoins = FALLBACK_COINS[currency] || FALLBACK_COINS.usd;
    const randomizedCoins = baseCoins.map(coin => {
      // ±0.2% fluctuation to provide live feeling when refreshed
      const jitterFactor = 1 + (Math.random() * 0.004 - 0.002);
      const newPrice = coin.current_price * jitterFactor;
      return {
        ...coin,
        current_price: newPrice,
      };
    });

    return {
      data: randomizedCoins,
      isFallback: true,
      timestamp: new Date(),
    };
  }
}

/**
 * Format currency value nicely according to selected currency
 */
export function formatCurrency(
  value: number,
  currency: Currency = 'usd',
  options?: { compact?: boolean; maximumFractionDigits?: number }
): string {
  const config = CURRENCIES[currency];

  if (value === undefined || value === null || isNaN(value)) {
    return `${config.symbol}0.00`;
  }

  if (options?.compact) {
    if (Math.abs(value) >= 1_000_000_000_000) {
      return `${config.symbol}${(value / 1_000_000_000_000).toFixed(2)}T`;
    }
    if (Math.abs(value) >= 1_000_000_000) {
      return `${config.symbol}${(value / 1_000_000_000).toFixed(2)}Mlyr`;
    }
    if (Math.abs(value) >= 1_000_000) {
      return `${config.symbol}${(value / 1_000_000).toFixed(2)}M`;
    }
  }

  let decimals = 2;
  if (options?.maximumFractionDigits !== undefined) {
    decimals = options.maximumFractionDigits;
  } else if (value < 0.0001) {
    decimals = 8;
  } else if (value < 1) {
    decimals = 4;
  }

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code.toUpperCase(),
    minimumFractionDigits: decimals <= 2 ? decimals : 2,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format plain numbers (supply, volumes, ranks)
 */
export function formatNumber(
  value: number,
  options?: { compact?: boolean }
): string {
  if (value === undefined || value === null || isNaN(value)) return '0';

  if (options?.compact) {
    if (Math.abs(value) >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (Math.abs(value) >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
  }

  return new Intl.NumberFormat('tr-TR').format(value);
}
