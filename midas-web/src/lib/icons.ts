// Utility functions for fetching and managing crypto and stock icons
// Based on midas-command-center implementation

// Map common crypto symbols to their icon identifiers
const cryptoIconMap: Record<string, string> = {
  'btc': 'btc',
  'eth': 'eth',
  'bnb': 'bnb',
  'usdt': 'usdt',
  'usdc': 'usdc',
  'doge': 'doge',
  'ada': 'ada',
  'sol': 'sol',
  'xrp': 'xrp',
  'dot': 'dot',
  'matic': 'matic',
  'ltc': 'ltc',
  'avax': 'avax',
  'link': 'link',
  'atom': 'atom',
  'etc': 'etc',
  'xlm': 'xlm',
  'algo': 'algo',
  'vet': 'vet',
  'fil': 'fil',
  'trx': 'trx',
  'eos': 'eos',
  'aave': 'aave',
  'uni': 'uni',
  'axs': 'axs',
  'mana': 'mana',
  'sand': 'sand',
  'gala': 'gala',
  'enj': 'enj',
  'chz': 'chz',
  'bat': 'bat',
  'zec': 'zec',
  'dash': 'dash',
  'xmr': 'xmr',
  'zrx': 'zrx',
  'comp': 'comp',
  'mkr': 'mkr',
  'yfi': 'yfi',
  'sushi': 'sushi',
  'snx': 'snx',
  'crv': 'crv',
  '1inch': '1inch',
  'grt': 'grt',
  'near': 'near',
  'ftm': 'ftm',
  'hbar': 'hbar',
  'egld': 'egld',
  'flow': 'flow',
  'theta': 'theta',
  'xtz': 'xtz',
  'icp': 'icp',
  'apt': 'apt',
  'op': 'op',
  'arb': 'arb',
  'inj': 'inj',
  'sei': 'sei',
  'sui': 'sui',
  'tia': 'tia',
  'stx': 'stx',
  'rndr': 'rndr',
  'imx': 'imx',
  'pyth': 'pyth',
  'pepe': 'pepe',
  'shib': 'shib',
  'wbtc': 'wbtc',
  'weth': 'weth',
};

// Known stock symbols for type detection
const knownStocks = new Set([
  'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'V',
  'JNJ', 'WMT', 'PG', 'MA', 'UNH', 'HD', 'DIS', 'BAC', 'ADBE', 'CRM', 'NFLX',
  'PYPL', 'INTC', 'VZ', 'T', 'PFE', 'KO', 'PEP', 'MRK', 'ABT', 'TMO', 'COST',
  'NKE', 'CSCO', 'AVGO', 'ACN', 'QCOM', 'TXN', 'NEE', 'LLY', 'DHR', 'MDT',
  'BMY', 'UNP', 'PM', 'RTX', 'HON', 'LOW', 'UPS', 'SBUX', 'IBM', 'CVX', 'XOM',
  'AMD', 'BA', 'CAT', 'GS', 'MMM', 'AXP', 'BKNG', 'ISRG', 'NOW', 'SPGI',
]);

// Cache for icon URLs
const iconCache: Record<string, string> = {};

// Helper to determine asset type if not provided
export function guessAssetType(symbol: string): 'crypto' | 'stock' {
  if (!symbol) return 'crypto';
  
  const baseSymbol = symbol.split('-')[0].toUpperCase();
  const lower = baseSymbol.toLowerCase();
  
  // Check if it's a known stock
  if (knownStocks.has(baseSymbol)) {
    return 'stock';
  }
  
  // Check if it's in crypto map
  if (cryptoIconMap[lower]) {
    return 'crypto';
  }
  
  // Heuristics: crypto symbols often have pairs (BTC-USDT) or are shorter
  if (symbol.includes('-') || symbol.includes('/')) {
    return 'crypto';
  }
  
  // Default: 3-4 letter symbols without numbers are likely crypto
  if (baseSymbol.length <= 5 && !/\d/.test(baseSymbol)) {
    return 'crypto';
  }
  
  return 'stock';
}

// Get stock icon URL from Financial Modeling Prep
export function getStockIconUrl(symbol: string): string {
  const baseSymbol = symbol.split('-')[0].toUpperCase();
  
  if (iconCache[`stock_${baseSymbol}`]) {
    return iconCache[`stock_${baseSymbol}`];
  }
  
  // FMP provides free stock logos
  const url = `https://financialmodelingprep.com/image-stock/${baseSymbol}.png`;
  iconCache[`stock_${baseSymbol}`] = url;
  return url;
}

// Get crypto icon URL - using multiple sources for reliability
export function getCryptoIconUrl(symbol: string): string {
  const baseSymbol = symbol.split('-')[0].toUpperCase();
  const lowerSymbol = baseSymbol.toLowerCase();
  
  if (iconCache[`crypto_${baseSymbol}`]) {
    return iconCache[`crypto_${baseSymbol}`];
  }

  // Primary source: CoinCap assets (very reliable, has most major cryptos)
  // Format: https://assets.coincap.io/assets/icons/{symbol}@2x.png
  const url = `https://assets.coincap.io/assets/icons/${lowerSymbol}@2x.png`;
  
  iconCache[`crypto_${baseSymbol}`] = url;
  return url;
}

// Unified function to get asset icon URL
export function getAssetIconUrl(symbol: string, type?: 'crypto' | 'stock' | 'forex'): string {
  const assetType = type || guessAssetType(symbol);
  
  if (assetType === 'stock') {
    return getStockIconUrl(symbol);
  }
  
  return getCryptoIconUrl(symbol);
}

// Alternative crypto icon sources for fallback
export function getCryptoIconFallbackUrl(symbol: string): string {
  const lowerSymbol = symbol.split('-')[0].toLowerCase();
  // CryptoIcons.org as fallback
  return `https://cryptoicons.org/api/icon/${lowerSymbol}/200`;
}
