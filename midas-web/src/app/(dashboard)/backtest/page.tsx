'use client'

/**
 * Backtest Dashboard Page
 * 
 * PRD: backtesting.md (PF-19)
 * User Story: US-22 (Backtest Strategies)
 * 
 * Features:
 * - List all backtests (completed, running, failed)
 * - Quick run backtest form
 * - Navigate to detailed results
 * 
 * UI/UX Improvements:
 * - SpotlightCard for the "Run New Backtest" section
 * - Animated table rows with framer-motion
 * - CountUp for metrics
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  Calendar,
  TrendingUp,
  Loader2,
  Plus,
} from 'lucide-react'
import { backtestService, strategyService } from '@/lib/api'
import type { BacktestResult, Strategy } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AssetIcon } from '@/components/ui/asset-icon'
import SpotlightCard from '@/components/ui/spotlight-card'
import { CountUp } from '@/components/ui/count-up'
import { cn, formatCurrency, formatPercentage, getValueColorClass } from '@/lib/utils'
import { format } from 'date-fns'
import { toast } from 'sonner'

// Mock backtests for display
const MOCK_BACKTESTS: BacktestResult[] = [
  {
    id: 'bt-1',
    strategyId: 'strat-1',
    symbol: 'BTCUSDT',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'completed',
    performance: {
      totalReturn: 28.5,
      winRate: 62.5,
      sharpeRatio: 1.85,
      maxDrawdown: 12.3,
      profitFactor: 1.95,
      totalTrades: 48,
      avgWin: 4.2,
      avgLoss: 2.1,
      initialCapital: 10000,
      finalCapital: 12850,
    },
    equityCurve: [],
    trades: [],
  },
  {
    id: 'bt-2',
    strategyId: 'strat-2',
    symbol: 'ETHUSDT',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    status: 'completed',
    performance: {
      totalReturn: 15.2,
      winRate: 58.0,
      sharpeRatio: 1.42,
      maxDrawdown: 8.5,
      profitFactor: 1.65,
      totalTrades: 35,
      avgWin: 3.8,
      avgLoss: 2.3,
      initialCapital: 10000,
      finalCapital: 11520,
    },
    equityCurve: [],
    trades: [],
  },
  {
    id: 'bt-3',
    strategyId: 'strat-3',
    symbol: 'SOLUSDT',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    status: 'completed',
    performance: {
      totalReturn: -5.8,
      winRate: 42.0,
      sharpeRatio: -0.35,
      maxDrawdown: 18.2,
      profitFactor: 0.82,
      totalTrades: 28,
      avgWin: 3.1,
      avgLoss: 3.8,
      initialCapital: 10000,
      finalCapital: 9420,
    },
    equityCurve: [],
    trades: [],
  },
]

export default function BacktestPage() {
  const [backtests, setBacktests] = useState<BacktestResult[]>([])
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)

  // Quick run form state
  const [selectedStrategy, setSelectedStrategy] = useState('')
  const [symbol, setSymbol] = useState('BTCUSDT')
  const [dateRange, setDateRange] = useState('90') // days

  useEffect(() => {
    const loadData = async () => {
      try {
        const [btData, stratData] = await Promise.all([
          backtestService.list(),
          strategyService.getSystemStrategies(),
        ])
        // Use mock data if API returns empty or incompatible data
        setBacktests(btData.length > 0 ? (btData as unknown as BacktestResult[]) : MOCK_BACKTESTS)
        setStrategies(stratData)
      } catch {
        setBacktests(MOCK_BACKTESTS)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleRunBacktest = async () => {
    if (!selectedStrategy) {
      toast.error('Please select a strategy')
      return
    }

    setIsRunning(true)
    try {
      const days = parseInt(dateRange)
      const result = await backtestService.run({
        strategyId: selectedStrategy,
        symbol,
        startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
      })
      
      toast.success('Backtest completed!')
      // Add to list with animation - cast to BacktestResult
      setBacktests(prev => [result as unknown as BacktestResult, ...prev])
    } catch {
      toast.error('Backtest failed')
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-700 border-none"><CheckCircle2 className="size-3 mr-1" />Completed</Badge>
      case 'running':
        return <Badge className="bg-sky-100 text-sky-700 border-none"><Loader2 className="size-3 mr-1 animate-spin" />Running</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 border-none"><XCircle className="size-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40" />
        <Skeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#3d2752]">Backtesting</h1>
        <p className="text-sm text-[#6B5B7A] mt-1">
          Test strategies against historical data before deploying
        </p>
      </div>

      {/* Quick Run Card - Enhanced with SpotlightCard */}
      <SpotlightCard className="bg-white border-[#E8E4DF]" spotlightColor="rgba(201, 169, 98, 0.15)">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-lg font-semibold text-[#3d2752]">Run New Backtest</CardTitle>
          <CardDescription className="text-[#6B5B7A]">
            Select a strategy and symbol to test
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger className="w-full sm:w-64 border-[#E8E4DF] focus:border-[#C9A962]">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              {strategies.map(s => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="w-full sm:w-40 border-[#E8E4DF] focus:border-[#C9A962]">
              <SelectValue placeholder="Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTCUSDT">BTC/USDT</SelectItem>
              <SelectItem value="ETHUSDT">ETH/USDT</SelectItem>
              <SelectItem value="SOLUSDT">SOL/USDT</SelectItem>
              <SelectItem value="AAPL">AAPL</SelectItem>
              <SelectItem value="NVDA">NVDA</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-36 border-[#E8E4DF] focus:border-[#C9A962]">
              <Calendar className="size-4 mr-2 text-[#C9A962]" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
              <SelectItem value="365">Last 1 year</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleRunBacktest} 
            disabled={isRunning || !selectedStrategy}
            className="cursor-pointer bg-[#3d2752] hover:bg-[#2d1b3e] text-white transition-all hover:scale-105 shadow-md shadow-[#3d2752]/20"
          >
            {isRunning ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="size-4 mr-2 text-[#C9A962]" />
                Run Backtest
              </>
            )}
          </Button>
        </div>
      </SpotlightCard>

      {/* Backtests Table */}
      <Card className="bg-white border-[#E8E4DF]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#3d2752]">Recent Backtests</CardTitle>
        </CardHeader>
        <CardContent>
          {backtests.length === 0 ? (
            <div className="py-12 text-center">
              <BarChart3 className="size-12 text-[#E8E4DF] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#3d2752] mb-1">No backtests yet</h3>
              <p className="text-sm text-[#6B5B7A]">
                Run your first backtest to see results here
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-[#E8E4DF]">
                  <TableHead className="text-[#6B5B7A]">Symbol</TableHead>
                  <TableHead className="text-[#6B5B7A]">Date Range</TableHead>
                  <TableHead className="text-[#6B5B7A]">Status</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Return</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Win Rate</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Sharpe</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Drawdown</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {backtests.map((bt) => (
                    <motion.tr
                      key={bt.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-[#E8E4DF] transition-colors hover:bg-[#FAF8F5] data-[state=selected]:bg-[#FAF8F5]"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E4DF] flex items-center justify-center p-1">
                            <AssetIcon symbol={bt.symbol.replace('USDT', '')} className="size-full" />
                          </div>
                          <span className="font-medium text-[#3d2752]">{bt.symbol}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-[#6B5B7A]">
                        {format(new Date(bt.startDate), 'MMM d')} - {format(new Date(bt.endDate), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>{getStatusBadge(bt.status)}</TableCell>
                      <TableCell className={cn("text-right font-medium tabular-nums", getValueColorClass(bt.performance.totalReturn))}>
                        <CountUp to={bt.performance.totalReturn} suffix="%" duration={1} prefix={bt.performance.totalReturn >= 0 ? '+' : ''} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-[#3d2752]">
                        <CountUp to={bt.performance.winRate} suffix="%" duration={1} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-[#3d2752]">
                        <CountUp to={bt.performance.sharpeRatio} duration={1} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-red-600">
                        <CountUp to={bt.performance.maxDrawdown} suffix="%" duration={1} prefix="-" />
                      </TableCell>
                      <TableCell>
                        <Link href={`/backtest/${bt.id}`}>
                          <Button variant="ghost" size="sm" className="cursor-pointer hover:bg-[#E8E4DF] text-[#6B5B7A] hover:text-[#3d2752]">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
