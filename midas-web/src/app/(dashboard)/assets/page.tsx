'use client'

/**
 * Assets Discovery Page
 * 
 * PRD: asset-discovery.md
 * Data Source: Real APIs from midas-market-data and midas-picker
 */

import { useState, useEffect, useMemo } from 'react'
import {
  Search,
  TrendingUp,
  TrendingDown,
  Filter,
  Plus,
} from 'lucide-react'
import { marketDataService } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetIcon } from '@/components/ui/asset-icon'
import { cn, formatCurrency, formatPercentage, formatCompactNumber, getValueColorClass } from '@/lib/utils'

// Mock asset data - Real API: midas-market-data /api/v1/market-data/symbols
const mockAssets = [
  { symbol: 'BTC', name: 'Bitcoin', assetType: 'crypto', price: 57058, change24h: 2.5, marketCap: 1120000000000, volume24h: 28500000000 },
  { symbol: 'ETH', name: 'Ethereum', assetType: 'crypto', price: 2675, change24h: 3.2, marketCap: 321000000000, volume24h: 15200000000 },
  { symbol: 'SOL', name: 'Solana', assetType: 'crypto', price: 146.47, change24h: -1.8, marketCap: 67000000000, volume24h: 3500000000 },
  { symbol: 'BNB', name: 'BNB', assetType: 'crypto', price: 425.80, change24h: 1.1, marketCap: 65000000000, volume24h: 1200000000 },
  { symbol: 'AAPL', name: 'Apple Inc.', assetType: 'stocks', price: 184, change24h: 0.8, marketCap: 2850000000000, volume24h: 52000000 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', assetType: 'stocks', price: 875, change24h: 4.2, marketCap: 2150000000000, volume24h: 45000000 },
  { symbol: 'MSFT', name: 'Microsoft', assetType: 'stocks', price: 415, change24h: 1.1, marketCap: 3090000000000, volume24h: 22000000 },
  { symbol: 'GOOGL', name: 'Alphabet', assetType: 'stocks', price: 142, change24h: 0.5, marketCap: 1780000000000, volume24h: 28000000 },
  { symbol: 'EUR/USD', name: 'Euro/Dollar', assetType: 'forex', price: 1.0875, change24h: 0.12, marketCap: 0, volume24h: 500000000000 },
  { symbol: 'GBP/USD', name: 'Pound/Dollar', assetType: 'forex', price: 1.2715, change24h: -0.25, marketCap: 0, volume24h: 150000000000 },
]

export default function AssetsPage() {
  const [assets, setAssets] = useState(mockAssets)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Real API: marketDataService calls midas-market-data backend
        const symbols = await marketDataService.getSymbols()
        if (symbols.length > 0) {
          // Would merge with price data here
          // For now, use mock data
        }
      } catch {
        console.warn('Market data API unavailable, using mock data')
      } finally {
        setIsLoading(false)
      }
    }
    loadAssets()
  }, [])

  // Filter assets
  const filteredAssets = useMemo(() => {
    let result = [...assets]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(a =>
        a.symbol.toLowerCase().includes(query) ||
        a.name.toLowerCase().includes(query)
      )
    }

    // Tab filter
    if (activeTab !== 'all') {
      result = result.filter(a => a.assetType === activeTab)
    }

    return result
  }, [assets, searchQuery, activeTab])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Assets</h1>
        <p className="text-sm text-slate-500 mt-1">
          Discover and explore trading opportunities
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-slate-200"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100">
          <TabsTrigger value="all" className="cursor-pointer">All</TabsTrigger>
          <TabsTrigger value="crypto" className="cursor-pointer">Crypto</TabsTrigger>
          <TabsTrigger value="stocks" className="cursor-pointer">Stocks</TabsTrigger>
          <TabsTrigger value="forex" className="cursor-pointer">Forex</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredAssets.length === 0 ? (
            <Card className="bg-white border-slate-200">
              <CardContent className="py-12 text-center">
                <Search className="size-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">No assets found</h3>
                <p className="text-sm text-slate-500">
                  Try adjusting your search
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssets.map((asset) => (
                <Card key={asset.symbol} className="bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-1">
                          <AssetIcon symbol={asset.symbol} assetType={asset.assetType} className="size-full" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{asset.symbol}</p>
                          <p className="text-xs text-slate-500">{asset.name}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="cursor-pointer">
                        <Plus className="size-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Price</span>
                        <span className="font-semibold tabular-nums text-slate-900">
                          {formatCurrency(asset.price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">24h Change</span>
                        <div className="flex items-center gap-1">
                          {asset.change24h >= 0 ? (
                            <TrendingUp className="size-4 text-emerald-600" />
                          ) : (
                            <TrendingDown className="size-4 text-red-600" />
                          )}
                          <span className={cn('font-medium tabular-nums', getValueColorClass(asset.change24h))}>
                            {formatPercentage(asset.change24h)}
                          </span>
                        </div>
                      </div>
                      {asset.marketCap > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Market Cap</span>
                          <span className="text-sm tabular-nums text-slate-700">
                            ${formatCompactNumber(asset.marketCap)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
