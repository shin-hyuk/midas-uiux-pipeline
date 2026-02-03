/**
 * API Types
 * 
 * TypeScript interfaces for all API responses.
 * These match the backend response structures from midas-backend services.
 */

// ============================================
// USER & AUTH
// ============================================

export interface User {
  id: string
  username: string
  email: string
  firstName?: string
  lastName?: string
  investmentAvatar?: 'value_vanguard' | 'innovation_instigator' | 'main_street_maverick'
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive'
  status: string
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  login: string  // Can be email or username
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

// ============================================
// PORTFOLIO
// ============================================

export interface Portfolio {
  id: string
  userId: string
  name: string
  description?: string
  totalValue: number
  dayChange: number
  dayChangePercent: number
  totalPnl: number
  totalPnlPercent: number
  holdings: Holding[]
  createdAt: string
  updatedAt: string
}

export interface Holding {
  id: string
  symbol: string
  name: string
  assetType: 'crypto' | 'stocks' | 'forex' | 'commodities'
  quantity: number
  avgCost: number
  currentPrice: number
  marketValue: number
  pnl: number
  pnlPercent: number
}

// ============================================
// WATCHLIST
// ============================================

export interface Watchlist {
  id: string
  name: string
  description?: string
  assets: WatchlistAsset[]
  createdAt: string
  updatedAt: string
}

export interface WatchlistAsset {
  symbol: string
  name: string
  assetType: 'crypto' | 'stocks' | 'forex' | 'commodities'
  currentPrice: number
  change24h: number
  changePercent24h: number
  addedAt: string
}

// ============================================
// MARKET DATA
// ============================================

export interface Symbol {
  symbol: string
  name: string
  assetType: 'crypto' | 'stocks' | 'forex' | 'commodities'
  exchange?: string
  logoUrl?: string
}

export interface PriceData {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  volume24h: number
  marketCap?: number
  timestamp: string
}

// ============================================
// STRATEGIES
// PRD: trading-strategies.md (PF-16)
// ============================================

export interface Strategy {
  id: string
  name: string
  description?: string
  type: 'sma_crossover' | 'rsi_oversold' | 'macd_signal' | 'ai_trend' | 'composite' | 'custom'
  assetClass: 'crypto' | 'stocks' | 'forex' | 'commodities' | 'multi'
  riskLevel: 'conservative' | 'moderate' | 'aggressive'
  status: 'active' | 'inactive' | 'draft'
  parameters?: Record<string, unknown>
  tags?: string[]
  performance?: StrategyPerformance
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface StrategyPerformance {
  totalReturn: number
  winRate: number
  sharpeRatio: number
  maxDrawdown: number
  profitFactor?: number
  totalTrades?: number
  avgWin?: number
  avgLoss?: number
}

// ============================================
// BACKTEST
// PRD: trading-strategies.md - Section 3.2
// ============================================

export interface BacktestRequest {
  strategyId: string
  symbol: string
  timeframe?: string
  startDate: string
  endDate: string
  initialCapital?: number
}

export interface BacktestResult {
  id: string
  strategyId: string
  symbol: string
  startDate: string
  endDate: string
  status: 'completed' | 'running' | 'failed' | 'pending'
  performance: StrategyPerformance & {
    finalCapital: number
    initialCapital: number
  }
  equityCurve: { date: string; value: number }[]
  trades: Trade[]
  createdAt?: string
}

export interface Trade {
  id: string
  entryDate: string
  exitDate: string
  entryPrice: number
  exitPrice: number
  side: 'long' | 'short'
  quantity: number
  pnl: number
  pnlPercent: number
}

// ============================================
// AI AGENT
// PRD: personal-investment-buddy.md, quick-action-buttons.md
// ============================================

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  quickActions?: QuickAction[]
  timestamp: string
}

export interface QuickAction {
  // PRD: quick-action-buttons.md (US-82)
  // Actions: Apply Strategy, Add to Watchlist, Run Backtest
  type: 'apply_strategy' | 'add_to_watchlist' | 'run_backtest'
  label: string
  payload: Record<string, unknown>
}

export interface ChatConversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

export interface ChatRequest {
  message: string
  conversationId?: string
  context?: {
    userAvatar?: string
    currentPage?: string
    selectedStrategyId?: string
    selectedSymbol?: string
  }
}

export interface ChatResponse {
  message: string
  conversationId: string
  quickActions?: QuickAction[]
}

// ============================================
// ALERTS
// ============================================

export interface Alert {
  id: string
  type: 'backtest_complete' | 'strategy_signal' | 'price_alert'
  title: string
  message: string
  read: boolean
  data?: Record<string, unknown>
  createdAt: string
}
