/**
 * Strategy Service
 * 
 * PRD: trading-strategies.md (PF-16)
 * Uses REAL API from midas-signal backend
 * Falls back to mock data when backend unavailable
 */

import { apiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import type { Strategy, StrategyPerformance } from '../types'

// Mock system strategies for when backend is unavailable
// Based on actual Midas trading strategies from backend
const MOCK_SYSTEM_STRATEGIES: Strategy[] = [
  {
    id: 'sys-momentum-btc',
    name: 'BTC Momentum Pro',
    description: 'Captures Bitcoin price momentum using RSI and MACD indicators with dynamic position sizing based on volatility.',
    type: 'momentum',
    assetClass: 'crypto',
    riskLevel: 'moderate',
    status: 'active',
    tags: ['BTC', 'momentum', 'technical'],
    createdBy: 'system',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    performance: {
      totalReturn: 47.8,
      winRate: 62.5,
      sharpeRatio: 1.85,
      maxDrawdown: 12.3,
      profitFactor: 2.1,
      totalTrades: 156,
    },
  },
  {
    id: 'sys-mean-reversion',
    name: 'ETH Mean Reversion',
    description: 'Exploits short-term price deviations from moving averages in Ethereum markets.',
    type: 'mean_reversion',
    assetClass: 'crypto',
    riskLevel: 'conservative',
    status: 'active',
    tags: ['ETH', 'mean-reversion', 'low-risk'],
    createdBy: 'system',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z',
    performance: {
      totalReturn: 28.4,
      winRate: 71.2,
      sharpeRatio: 2.15,
      maxDrawdown: 6.8,
      profitFactor: 2.8,
      totalTrades: 243,
    },
  },
  {
    id: 'sys-trend-following',
    name: 'Multi-Asset Trend',
    description: 'Follows major market trends across multiple crypto assets using breakout detection.',
    type: 'trend_following',
    assetClass: 'crypto',
    riskLevel: 'aggressive',
    status: 'active',
    tags: ['multi-asset', 'trend', 'breakout'],
    createdBy: 'system',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-12-05T00:00:00Z',
    performance: {
      totalReturn: 89.2,
      winRate: 48.3,
      sharpeRatio: 1.42,
      maxDrawdown: 24.5,
      profitFactor: 1.65,
      totalTrades: 89,
    },
  },
  {
    id: 'sys-dca-accumulator',
    name: 'Smart DCA Accumulator',
    description: 'Dollar-cost averaging with intelligent entry points based on fear & greed index.',
    type: 'dca',
    assetClass: 'crypto',
    riskLevel: 'conservative',
    status: 'active',
    tags: ['DCA', 'long-term', 'accumulation'],
    createdBy: 'system',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-11-20T00:00:00Z',
    performance: {
      totalReturn: 35.6,
      winRate: 85.4,
      sharpeRatio: 2.45,
      maxDrawdown: 8.2,
      profitFactor: 3.2,
      totalTrades: 312,
    },
  },
  {
    id: 'sys-market-cap-rotation',
    name: 'Market Cap Rotation',
    description: 'Rotates holdings based on market cap rankings and momentum scores.',
    type: 'rotation',
    assetClass: 'crypto',
    riskLevel: 'moderate',
    status: 'active',
    tags: ['rotation', 'market-cap', 'diversified'],
    createdBy: 'system',
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    performance: {
      totalReturn: 52.3,
      winRate: 58.9,
      sharpeRatio: 1.78,
      maxDrawdown: 15.4,
      profitFactor: 1.95,
      totalTrades: 78,
    },
  },
  {
    id: 'sys-stock-momentum',
    name: 'US Tech Momentum',
    description: 'Momentum strategy focused on US technology stocks with sector rotation.',
    type: 'momentum',
    assetClass: 'stocks',
    riskLevel: 'moderate',
    status: 'active',
    tags: ['stocks', 'tech', 'momentum'],
    createdBy: 'system',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-11-28T00:00:00Z',
    performance: {
      totalReturn: 32.1,
      winRate: 55.8,
      sharpeRatio: 1.52,
      maxDrawdown: 11.2,
      profitFactor: 1.75,
      totalTrades: 124,
    },
  },
  {
    id: 'sys-arbitrage-defi',
    name: 'DeFi Yield Optimizer',
    description: 'Optimizes yields across DeFi protocols with automatic rebalancing.',
    type: 'arbitrage',
    assetClass: 'crypto',
    riskLevel: 'aggressive',
    status: 'active',
    tags: ['DeFi', 'yield', 'arbitrage'],
    createdBy: 'system',
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z',
    performance: {
      totalReturn: 68.7,
      winRate: 72.1,
      sharpeRatio: 1.95,
      maxDrawdown: 18.9,
      profitFactor: 2.45,
      totalTrades: 456,
    },
  },
  {
    id: 'sys-volatility-harvest',
    name: 'Volatility Harvester',
    description: 'Profits from volatility spikes using options-like strategies on perpetuals.',
    type: 'volatility',
    assetClass: 'crypto',
    riskLevel: 'aggressive',
    status: 'active',
    tags: ['volatility', 'perpetuals', 'advanced'],
    createdBy: 'system',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z',
    performance: {
      totalReturn: 95.4,
      winRate: 45.2,
      sharpeRatio: 1.28,
      maxDrawdown: 32.1,
      profitFactor: 1.55,
      totalTrades: 198,
    },
  },
]

interface BackendStrategy {
  id: string
  name: string
  description?: string
  strategy_type: string
  asset_class?: string
  risk_level?: string
  status: string
  parameters?: Record<string, unknown>
  tags?: string[]
  created_by: string
  created_at: string
  updated_at: string
  performance?: {
    total_return: number
    win_rate: number
    sharpe_ratio: number
    max_drawdown: number
    profit_factor?: number
    total_trades?: number
  }
}

function transformStrategy(backend: BackendStrategy): Strategy {
  return {
    id: backend.id,
    name: backend.name,
    description: backend.description,
    type: backend.strategy_type as Strategy['type'],
    assetClass: (backend.asset_class || 'crypto') as Strategy['assetClass'],
    riskLevel: (backend.risk_level || 'moderate') as Strategy['riskLevel'],
    status: backend.status as Strategy['status'],
    parameters: backend.parameters,
    tags: backend.tags,
    createdBy: backend.created_by,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
    performance: backend.performance ? {
      totalReturn: backend.performance.total_return,
      winRate: backend.performance.win_rate,
      sharpeRatio: backend.performance.sharpe_ratio,
      maxDrawdown: backend.performance.max_drawdown,
      profitFactor: backend.performance.profit_factor,
      totalTrades: backend.performance.total_trades,
    } : undefined,
  }
}

export const strategyService = {
  async list(params?: {
    status?: string
    assetClass?: string
    riskLevel?: string
  }): Promise<Strategy[]> {
    try {
      const query = new URLSearchParams()
      if (params?.status) query.append('status', params.status)
      if (params?.assetClass) query.append('asset_class', params.assetClass)
      if (params?.riskLevel) query.append('risk_level', params.riskLevel)
      
      const url = query.toString()
        ? `${API_ENDPOINTS.builder.strategies.list}?${query}`
        : API_ENDPOINTS.builder.strategies.list
      
      const response = await apiClient.get<BackendStrategy[]>(url)
      return response.map(transformStrategy)
    } catch {
      // Return mock data on API failure
      let filtered = [...MOCK_SYSTEM_STRATEGIES]
      if (params?.assetClass) {
        filtered = filtered.filter(s => s.assetClass === params.assetClass)
      }
      if (params?.riskLevel) {
        filtered = filtered.filter(s => s.riskLevel === params.riskLevel)
      }
      return filtered
    }
  },

  async getSystemStrategies(): Promise<Strategy[]> {
    try {
      const response = await apiClient.get<{ strategies?: BackendStrategy[] } | BackendStrategy[]>(API_ENDPOINTS.strategies.system)
      // Handle both array and object responses
      const strategies = Array.isArray(response) ? response : (response.strategies || [])
      return strategies.map(transformStrategy)
    } catch {
      // Return mock system strategies on API failure
      console.info('Using mock system strategies (API unavailable)')
      return MOCK_SYSTEM_STRATEGIES
    }
  },

  async getWithPerformance(): Promise<Strategy[]> {
    try {
      const response = await apiClient.get<{ rows?: BackendStrategy[] } | BackendStrategy[]>(API_ENDPOINTS.strategies.performance)
      // Handle both array and object responses
      const strategies = Array.isArray(response) ? response : (response.rows || [])
      return strategies.map(transformStrategy)
    } catch {
      // Return mock data on API failure
      console.info('Using mock strategies with performance (API unavailable)')
      return MOCK_SYSTEM_STRATEGIES
    }
  },

  async get(id: string): Promise<Strategy> {
    const response = await apiClient.get<BackendStrategy>(API_ENDPOINTS.builder.strategies.get(id))
    return transformStrategy(response)
  },

  async create(data: Partial<Strategy>): Promise<Strategy> {
    const response = await apiClient.post<BackendStrategy>(API_ENDPOINTS.builder.strategies.create, {
      name: data.name,
      description: data.description,
      strategy_type: data.type,
      asset_class: data.assetClass,
      risk_level: data.riskLevel,
      parameters: data.parameters,
      tags: data.tags,
    })
    return transformStrategy(response)
  },

  async clone(id: string, newName?: string): Promise<Strategy> {
    const response = await apiClient.post<BackendStrategy>(
      API_ENDPOINTS.builder.strategies.clone(id),
      newName ? { name: newName } : undefined
    )
    return transformStrategy(response)
  },

  async getSimilar(id: string): Promise<Strategy[]> {
    const response = await apiClient.get<BackendStrategy[]>(API_ENDPOINTS.strategies.similar(id))
    return response.map(transformStrategy)
  },
}
