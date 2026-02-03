/**
 * Market Data Service
 * 
 * Uses REAL API from midas-market-data backend
 */

import { apiClient } from '../client'
import { API_ENDPOINTS } from '../config'
import type { Symbol, PriceData } from '../types'

interface BackendSymbol {
  symbol: string
  name: string
  asset_type: string
  exchange?: string
  logo_url?: string
}

interface BackendPrice {
  symbol: string
  price: number
  change_24h: number
  change_percent_24h: number
  volume_24h: number
  market_cap?: number
  timestamp: string
}

export const marketDataService = {
  async getSymbols(assetType?: string): Promise<Symbol[]> {
    const query = assetType ? `?asset_type=${assetType}` : ''
    const response = await apiClient.get<BackendSymbol[]>(`${API_ENDPOINTS.marketData.symbols}${query}`)
    
    return response.map(s => ({
      symbol: s.symbol,
      name: s.name,
      assetType: s.asset_type as Symbol['assetType'],
      exchange: s.exchange,
      logoUrl: s.logo_url,
    }))
  },

  async getLatestPrices(symbols?: string[]): Promise<PriceData[]> {
    const query = symbols?.length ? `?symbols=${symbols.join(',')}` : ''
    const response = await apiClient.get<BackendPrice[]>(`${API_ENDPOINTS.marketData.pricesLatest}${query}`)
    
    return response.map(p => ({
      symbol: p.symbol,
      price: p.price,
      change24h: p.change_24h,
      changePercent24h: p.change_percent_24h,
      volume24h: p.volume_24h,
      marketCap: p.market_cap,
      timestamp: p.timestamp,
    }))
  },

  async getHistoricalPrices(params: {
    symbol: string
    timeframe?: string
    startTime?: string
    endTime?: string
    limit?: number
  }): Promise<PriceData[]> {
    const query = new URLSearchParams()
    query.append('symbol', params.symbol)
    if (params.timeframe) query.append('timeframe', params.timeframe)
    if (params.startTime) query.append('start_time', params.startTime)
    if (params.endTime) query.append('end_time', params.endTime)
    if (params.limit) query.append('limit', params.limit.toString())

    const response = await apiClient.get<BackendPrice[]>(
      `${API_ENDPOINTS.marketData.pricesHistorical}?${query}`
    )
    
    return response.map(p => ({
      symbol: p.symbol,
      price: p.price,
      change24h: p.change_24h,
      changePercent24h: p.change_percent_24h,
      volume24h: p.volume_24h,
      marketCap: p.market_cap,
      timestamp: p.timestamp,
    }))
  },
}
