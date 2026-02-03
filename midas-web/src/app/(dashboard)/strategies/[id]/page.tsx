'use client'

/**
 * Strategy Detail Page
 * 
 * PRD: trading-strategies.md (PF-16)
 * User Stories: US-21 (Create Strategies), US-22 (Backtest Strategies)
 * 
 * Detail page content from PRD Section 3.1.1:
 * - Full Performance Metrics
 * - Complete Strategy Logic
 * - List of Aligned Assets
 * - CTAs: Apply, Clone, Bookmark, Run Backtest
 */

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Play,
  Copy,
  Bookmark,
  Share2,
  Clock,
  Target,
  Shield,
  Zap,
  Loader2,
} from 'lucide-react'
import { strategyService, backtestService } from '@/lib/api'
import type { Strategy } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { AssetIcon } from '@/components/ui/asset-icon'
import { cn, formatPercentage, formatCurrency, getValueColorClass } from '@/lib/utils'

// Risk badge styling
const getRiskBadgeClass = (risk: string) => {
  switch (risk) {
    case 'conservative': return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'moderate': return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'aggressive': return 'bg-red-50 text-red-700 border-red-200'
    default: return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

export default function StrategyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRunningBacktest, setIsRunningBacktest] = useState(false)

  useEffect(() => {
    const loadStrategy = async () => {
      try {
        const data = await strategyService.get(id)
        setStrategy(data)
      } catch (error) {
        console.error('Failed to load strategy:', error)
        toast.error('Strategy not found')
        router.push('/strategies')
      } finally {
        setIsLoading(false)
      }
    }
    loadStrategy()
  }, [id, router])

  // PRD: US-22 - Run Backtest
  const handleRunBacktest = async () => {
    if (!strategy) return
    
    setIsRunningBacktest(true)
    try {
      const result = await backtestService.run({
        strategyId: strategy.id,
        symbol: 'BTCUSDT', // Default symbol
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
        endDate: new Date().toISOString(),
      })
      
      toast.success('Backtest completed!')
      // Navigate to backtest results
      router.push(`/backtest/${result.id}`)
    } catch {
      toast.error('Failed to start backtest')
    } finally {
      setIsRunningBacktest(false)
    }
  }

  // PRD: US-39 - Clone Strategy
  const handleClone = async () => {
    if (!strategy) return
    
    try {
      const cloned = await strategyService.clone(strategy.id, `${strategy.name} (Copy)`)
      toast.success('Strategy cloned!')
      router.push(`/strategies/${cloned.id}`)
    } catch {
      toast.error('Failed to clone strategy')
    }
  }

  // PRD: US-38 - Bookmark Strategy
  const handleBookmark = () => {
    toast.success('Strategy bookmarked!')
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-64" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  if (!strategy) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mt-1 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
          </Button>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-1">
                <AssetIcon symbol={strategy.assetClass === 'crypto' ? 'BTC' : 'AAPL'} assetType={strategy.assetClass} className="size-full" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  {strategy.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={cn('text-xs', getRiskBadgeClass(strategy.riskLevel))}>
                    {strategy.riskLevel}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {strategy.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {strategy.assetClass}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions - PRD Section 3.2 */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBookmark} className="cursor-pointer">
            <Bookmark className="size-4" />
            Bookmark
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Share2 className="size-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleClone} className="cursor-pointer">
            <Copy className="size-4" />
            Clone
          </Button>
          <Button 
            onClick={handleRunBacktest} 
            disabled={isRunningBacktest}
            className="cursor-pointer"
          >
            {isRunningBacktest ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="size-4" />
                Run Backtest
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                About this Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                {strategy.description || `A ${strategy.riskLevel} ${strategy.type} strategy designed for ${strategy.assetClass} markets.`}
              </p>
            </CardContent>
          </Card>

          {/* Performance Metrics - PRD Section 3.1.1 */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Performance Metrics
              </CardTitle>
              <CardDescription>
                Historical performance based on backtesting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Return</p>
                  <p className={cn('text-2xl font-semibold tabular-nums', getValueColorClass(strategy.performance?.totalReturn || 0))}>
                    {formatPercentage(strategy.performance?.totalReturn || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Win Rate</p>
                  <p className="text-2xl font-semibold tabular-nums text-slate-900">
                    {strategy.performance?.winRate?.toFixed(1) || '—'}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Sharpe Ratio</p>
                  <p className="text-2xl font-semibold tabular-nums text-slate-900">
                    {strategy.performance?.sharpeRatio?.toFixed(2) || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Max Drawdown</p>
                  <p className="text-2xl font-semibold tabular-nums text-red-600">
                    {strategy.performance?.maxDrawdown ? `-${strategy.performance.maxDrawdown.toFixed(1)}%` : '—'}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Profit Factor</p>
                  <p className="text-lg font-semibold tabular-nums text-slate-900">
                    {strategy.performance?.profitFactor?.toFixed(2) || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Trades</p>
                  <p className="text-lg font-semibold tabular-nums text-slate-900">
                    {strategy.performance?.totalTrades || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Avg Win</p>
                  <p className="text-lg font-semibold tabular-nums text-emerald-600">
                    {strategy.performance?.avgWin ? `+${strategy.performance.avgWin.toFixed(2)}%` : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Avg Loss</p>
                  <p className="text-lg font-semibold tabular-nums text-red-600">
                    {strategy.performance?.avgLoss ? `-${strategy.performance.avgLoss.toFixed(2)}%` : '—'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Logic - PRD Section 3.1.1 */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Strategy Logic
              </CardTitle>
              <CardDescription>
                How this strategy generates signals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <Target className="size-4 text-sky-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Strategy Type</p>
                  <p className="text-sm text-slate-500">{strategy.type}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="size-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Timeframe</p>
                  <p className="text-sm text-slate-500">Daily, 4H, 1H</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="size-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Risk Level</p>
                  <p className="text-sm text-slate-500">{strategy.riskLevel}</p>
                </div>
              </div>

              {strategy.parameters && Object.keys(strategy.parameters).length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                    <Zap className="size-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Parameters</p>
                    <div className="text-sm text-slate-500 mt-1 space-y-1">
                      {Object.entries(strategy.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span>{key}:</span>
                          <span className="font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full cursor-pointer" onClick={handleRunBacktest} disabled={isRunningBacktest}>
                <Play className="size-4" />
                Run Backtest
              </Button>
              <Button variant="outline" className="w-full cursor-pointer" onClick={handleClone}>
                <Copy className="size-4" />
                Clone & Customize
              </Button>
              <Button variant="outline" className="w-full cursor-pointer">
                <TrendingUp className="size-4" />
                Apply to Portfolio
              </Button>
            </CardContent>
          </Card>

          {/* Compatible Assets - PRD Section 3.1.1 */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Compatible Assets
              </CardTitle>
              <CardDescription>
                Recommended assets for this strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['BTC', 'ETH', 'SOL', 'AAPL', 'NVDA'].map((symbol) => (
                  <div
                    key={symbol}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-900">{symbol}</span>
                    <Button variant="ghost" size="sm" className="text-xs cursor-pointer">
                      Add to Watchlist
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {strategy.tags && strategy.tags.length > 0 && (
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {strategy.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
