'use client'

/**
 * Strategies Gallery Page
 * 
 * PRD: trading-strategies.md (PF-16)
 * User Story: US-19 (Predefined Strategies)
 * 
 * Features implemented:
 * - Performance cards with metrics (Return, Win Rate, Sharpe, Max Drawdown)
 * - Risk level badges
 * - Filtering by asset class and risk level
 * - Tabs for All/My Strategies/Bookmarked
 * 
 * UI/UX Improvements:
 * - Staggered animation for strategy cards using framer-motion
 * - SpotlightCard for enhanced visual interaction
 * - CountUp for metrics
 */

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, BarChart3, Plus } from 'lucide-react'
import { strategyService } from '@/lib/api'
import type { Strategy } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetIcon } from '@/components/ui/asset-icon'
import SpotlightCard from '@/components/ui/spotlight-card'
import { CountUp } from '@/components/ui/count-up'
import { cn, formatPercentage, getValueColorClass } from '@/lib/utils'

// Risk badge styling
const getRiskBadgeClass = (risk: string) => {
  switch (risk) {
    case 'conservative': return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'moderate': return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'aggressive': return 'bg-red-50 text-red-700 border-red-200'
    default: return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [assetFilter, setAssetFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [sortBy, setSortBy] = useState('return')

  useEffect(() => {
    const loadStrategies = async () => {
      try {
        // Real API: strategyService calls midas-signal backend
        const data = await strategyService.getWithPerformance()
        setStrategies(data)
      } catch {
        // Try system strategies as fallback
        try {
          const systemData = await strategyService.getSystemStrategies()
          setStrategies(systemData)
        } catch {
          console.warn('Strategy API unavailable')
          setStrategies([])
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadStrategies()
  }, [])

  // Filter and sort strategies
  const filteredStrategies = useMemo(() => {
    let result = [...strategies]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query)
      )
    }

    // Asset class filter
    if (assetFilter !== 'all') {
      result = result.filter(s => s.assetClass === assetFilter)
    }

    // Risk level filter
    if (riskFilter !== 'all') {
      result = result.filter(s => s.riskLevel === riskFilter)
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'return':
          return (b.performance?.totalReturn || 0) - (a.performance?.totalReturn || 0)
        case 'winrate':
          return (b.performance?.winRate || 0) - (a.performance?.winRate || 0)
        case 'sharpe':
          return (b.performance?.sharpeRatio || 0) - (a.performance?.sharpeRatio || 0)
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return result
  }, [strategies, searchQuery, assetFilter, riskFilter, sortBy])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#3d2752]">Strategies</h1>
          <p className="text-sm text-[#6B5B7A] mt-1">
            Discover and apply trading strategies to your portfolio
          </p>
        </div>
        <Link href="/strategies/create">
          <Button className="cursor-pointer bg-[#C9A962] hover:bg-[#B89952] text-[#2D1B4E]">
            <Plus className="size-4 mr-2" />
            Create Strategy
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="bg-[#F5F3F0]">
            <TabsTrigger value="all" className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-[#3d2752]">All Strategies</TabsTrigger>
            <TabsTrigger value="my" className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-[#3d2752]">My Strategies</TabsTrigger>
            <TabsTrigger value="bookmarked" className="cursor-pointer data-[state=active]:bg-white data-[state=active]:text-[#3d2752]">Bookmarked</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B5B7A]" />
              <Input
                placeholder="Search strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48 border-[#E8E4DF] focus:border-[#C9A962]"
              />
            </div>

            <Select value={assetFilter} onValueChange={setAssetFilter}>
              <SelectTrigger className="w-32 border-[#E8E4DF]">
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-32 border-[#E8E4DF]">
                <SelectValue placeholder="Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 border-[#E8E4DF]">
                <SlidersHorizontal className="size-4 mr-2" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="return">Return</SelectItem>
                <SelectItem value="winrate">Win Rate</SelectItem>
                <SelectItem value="sharpe">Sharpe Ratio</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          {filteredStrategies.length === 0 ? (
            <Card className="bg-white border-slate-200">
              <CardContent className="py-12 text-center">
                <BarChart3 className="size-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">No strategies found</h3>
                <p className="text-sm text-slate-500">
                  Try adjusting your filters or search query
                </p>
              </CardContent>
            </Card>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredStrategies.map((strategy) => (
                <motion.div key={strategy.id} variants={itemVariants}>
                  <StrategyCard strategy={strategy} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="my" className="mt-4">
          <Card className="bg-white border-slate-200">
            <CardContent className="py-12 text-center">
              <BarChart3 className="size-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No custom strategies yet</h3>
              <p className="text-sm text-slate-500 mb-4">
                Create your first strategy to see it here
              </p>
              <Link href="/strategies/create">
                <Button className="cursor-pointer">
                  <Plus className="size-4 mr-2" />
                  Create Strategy
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarked" className="mt-4">
          <Card className="bg-white border-slate-200">
            <CardContent className="py-12 text-center">
              <BarChart3 className="size-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No bookmarked strategies</h3>
              <p className="text-sm text-slate-500">
                Bookmark strategies to quickly access them later
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/**
 * Strategy Card Component
 * 
 * PRD: trading-strategies.md - Section 3.1.1 Performance Cards
 * Shows: Strategy Name & Type, Asset Class, Performance Metrics, Risk Level, Tags
 */
function StrategyCard({ strategy }: { strategy: Strategy }) {
  return (
    <Link href={`/strategies/${strategy.id}`} className="block h-full group">
      <SpotlightCard 
        className="h-full bg-white border-[#E8E4DF] p-0 transition-all duration-300 group-hover:border-[#C9A962]/50 group-hover:shadow-lg group-hover:shadow-[#C9A962]/10" 
        spotlightColor="rgba(201, 169, 98, 0.15)"
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E8E4DF] flex items-center justify-center overflow-hidden p-1">
                <AssetIcon symbol={strategy.assetClass === 'crypto' ? 'BTC' : 'AAPL'} assetType={strategy.assetClass} className="size-full" />
              </div>
              <Badge variant="outline" className={cn('text-xs', getRiskBadgeClass(strategy.riskLevel))}>
                {strategy.riskLevel}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-base font-semibold text-[#3d2752] line-clamp-1 group-hover:text-[#C9A962] transition-colors">
            {strategy.name}
          </CardTitle>
          <CardDescription className="text-sm text-[#6B5B7A] line-clamp-2 mb-4 mt-1">
            {strategy.description || `${strategy.type} strategy for ${strategy.assetClass}`}
          </CardDescription>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[#6B5B7A]">Total Return</p>
              <p className={cn('text-sm font-semibold tabular-nums flex items-center', getValueColorClass(strategy.performance?.totalReturn || 0))}>
                <CountUp to={strategy.performance?.totalReturn || 0} suffix="%" duration={1} prefix={(strategy.performance?.totalReturn || 0) >= 0 ? '+' : ''} />
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B5B7A]">Win Rate</p>
              <p className="text-sm font-semibold tabular-nums text-[#3d2752] flex items-center">
                <CountUp to={strategy.performance?.winRate || 0} suffix="%" duration={1} />
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B5B7A]">Sharpe Ratio</p>
              <p className="text-sm font-semibold tabular-nums text-[#3d2752] flex items-center">
                <CountUp to={strategy.performance?.sharpeRatio || 0} duration={1} />
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B5B7A]">Max Drawdown</p>
              <p className="text-sm font-semibold tabular-nums text-red-600 flex items-center">
                <CountUp to={strategy.performance?.maxDrawdown || 0} suffix="%" duration={1} prefix="-" />
              </p>
            </div>
          </div>

          {/* Tags */}
          {strategy.tags && strategy.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#E8E4DF]">
              {strategy.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs bg-[#FAF8F5] text-[#6B5B7A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </SpotlightCard>
    </Link>
  )
}
