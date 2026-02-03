/**
 * API Configuration
 * 
 * PRD Reference: All backend integrations
 * This file defines endpoints for REAL backend APIs from midas-backend.
 * Mock data is only used for services not yet implemented.
 */

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 30000,
}

export const API_ENDPOINTS = {
  // ============================================
  // AUTH (midas-user) - REAL API
  // ============================================
  auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    refresh: '/api/v1/auth/refresh',
    logout: '/api/v1/auth/logout',
  },

  // ============================================
  // USERS (midas-user) - REAL API
  // ============================================
  users: {
    list: '/api/v1/users',
    get: (userId: string) => `/api/v1/users/${userId}`,
    update: (userId: string) => `/api/v1/users/${userId}`,
    interestTopics: (userId: string) => `/api/v1/users/${userId}/interest-topics`,
    recommendations: (userId: string) => `/api/v1/users/${userId}/recommendations`,
  },

  // ============================================
  // PORTFOLIO (midas-user) - REAL API
  // ============================================
  portfolio: {
    getByUserId: '/api/v1/userportfolio/userid',
    create: '/api/v1/userportfolio',
    update: '/api/v1/userportfolio',
    delete: '/api/v1/userportfolio',
    getDetails: (portfolioId: string) => `/api/v1/userportfolio/${portfolioId}/details`,
    addDetail: (portfolioId: string) => `/api/v1/userportfolio/${portfolioId}/details`,
  },

  // ============================================
  // WATCHLIST (midas-user) - REAL API
  // ============================================
  watchlist: {
    getByUserId: '/api/v1/watchlist/userid',
    create: '/api/v1/watchlist',
    update: '/api/v1/watchlist',
    delete: '/api/v1/watchlist',
    getSymbols: (watchlistId: string) => `/api/v1/watchlist/${watchlistId}/symbols`,
    addSymbol: (watchlistId: string) => `/api/v1/watchlist/${watchlistId}/symbols`,
    removeSymbol: (watchlistId: string) => `/api/v1/watchlist/${watchlistId}/symbols`,
  },

  // ============================================
  // MARKET DATA (midas-market-data) - REAL API
  // ============================================
  marketData: {
    symbols: '/api/v1/market-data/symbols',
    pricesLatest: '/api/v1/market-data/prices/latest',
    pricesHistorical: '/api/v1/market-data/prices/historical',
    ohlcvLatest: '/api/v1/market-data/ohlcv/latest',
    ohlcvRange: '/api/v1/market-data/ohlcv/range',
  },

  // ============================================
  // PICKER (midas-picker) - REAL API
  // ============================================
  picker: {
    filter: '/api/v1/picker/filter',
    sectors: '/api/v1/picker/categories/sectors',
    indices: '/api/v1/picker/categories/indices',
    tags: '/api/v1/picker/categories/tags',
    types: '/api/v1/picker/types',
  },

  // ============================================
  // STRATEGIES (midas-signal) - REAL API
  // ============================================
  builder: {
    strategies: {
      list: '/api/v1/builder/strategies',
      get: (id: string) => `/api/v1/builder/strategies/${id}`,
      create: '/api/v1/builder/strategies',
      update: (id: string) => `/api/v1/builder/strategies/${id}`,
      delete: (id: string) => `/api/v1/builder/strategies/${id}`,
      clone: (id: string) => `/api/v1/builder/strategies/${id}/clone`,
      activate: (id: string) => `/api/v1/builder/strategies/${id}/activate`,
      symbols: (id: string) => `/api/v1/builder/strategies/${id}/symbols`,
    },
    components: {
      indicators: '/api/v1/builder/components/indicators',
      sentiments: '/api/v1/builder/components/sentiments',
      steps: '/api/v1/builder/components/steps',
    },
  },

  strategies: {
    system: '/api/v1/strategies/system',
    performance: '/api/v1/strategies/performance',
    similar: (id: string) => `/api/v1/strategies/${id}/similar`,
  },

  // ============================================
  // BACKTEST (midas-backtest) - REAL API
  // ============================================
  backtest: {
    list: '/api/v1/backtest',
    get: (id: string) => `/api/v1/backtest/${id}`,
    status: (id: string) => `/api/v1/backtest/${id}/status`,
    result: (id: string) => `/api/v1/backtest/${id}/result`,
    run: '/api/v1/backtest/run',
    create: '/api/v1/backtest',
  },

  // ============================================
  // AI AGENT (midas-agent) - REAL API
  // ============================================
  agent: {
    chat: '/api/v1/agent/chat',
    conversations: '/api/v1/agent/conversations',
    conversation: (id: string) => `/api/v1/agent/conversations/${id}`,
  },

  // ============================================
  // ALERTS (midas-alert) - REAL API
  // ============================================
  alerts: {
    list: '/api/v1/alerts',
    get: (id: string) => `/api/v1/alerts/${id}`,
    create: '/api/v1/alerts',
    update: (id: string) => `/api/v1/alerts/${id}`,
  },

  // ============================================
  // SENTIMENT (midas-sentiment) - REAL API
  // ============================================
  sentiment: {
    get: '/api/v1/sentiment',
    bySymbol: (symbol: string) => `/api/v1/sentiment/${symbol}`,
  },

  // ============================================
  // NEWS (midas-news) - REAL API
  // ============================================
  news: {
    bySymbol: (symbol: string) => `/api/v1/news/${symbol}`,
  },
}

// Services that need mock data (backend not implemented)
export const MOCK_SERVICES = {
  exchange: true,      // midas-exchange not implemented
  billing: true,       // midas-billing not implemented
}
