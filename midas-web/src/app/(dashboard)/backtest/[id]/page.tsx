'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  DollarSign,
  Download,
  Share2,
} from 'lucide-react'
import { backtestService } from '@/lib/api'
import type { BacktestResult } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetIcon } from '@/components/ui/asset-icon'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn, formatCurrency, formatPercentage, getValueColorClass } from '@/lib/utils'
import { format } from 'date-fns'

export default function BacktestResultPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [result, setResult] = useState<BacktestResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadResult = async () => {
      try {
        const data = await backtestService.getResult(id)
        setResult(data)
      } catch (error) {
        console.error('Failed to load backtest result:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadResult()
  }, [id])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <BarChart3 className="size-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Backtest Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          This backtest may have been deleted or the ID is invalid.
        </p>
        <Button onClick={() => router.push('/backtest')} className="cursor-pointer">
          Back to Backtests
        </Button>
      </div>
    )
  }

  const formatDate = (dateStr: string) => format(new Date(dateStr), 'MMM d, yyyy')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="cursor-pointer"
          >
            <ArrowLeft className="size-4" />
          </Button>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1">
                <AssetIcon symbol={result.symbol.replace('USDT', '')} className="size-full" />
              </div>
              <h1 className="text-2xl font-semibold text-slate-900">Backtest Results</h1>
              <Badge variant="outline" className="ml-2">
                {result.symbol}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 ml-11">
              <Calendar className="size-3" />
              <span>
                {formatDate(result.startDate)} - {formatDate(result.endDate)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Share2 className="size-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Download className="size-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <TrendingUp className="size-4" />
              Total Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold tabular-nums", getValueColorClass(result.performance.totalReturn))}>
              {formatPercentage(result.performance.totalReturn)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Net Profit: {formatCurrency(result.performance.finalCapital - result.performance.initialCapital)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Activity className="size-4" />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums text-slate-900">
              {result.performance.winRate.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {result.performance.totalTrades} Total Trades
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <BarChart3 className="size-4" />
              Sharpe Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums text-slate-900">
              {result.performance.sharpeRatio.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Profit Factor: {result.performance.profitFactor.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <TrendingDown className="size-4" />
              Max Drawdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums text-red-600">
              -{result.performance.maxDrawdown.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Risk Level: {result.performance.maxDrawdown > 20 ? 'High' : result.performance.maxDrawdown > 10 ? 'Medium' : 'Low'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Curve Chart */}
        <Card className="lg:col-span-2 bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Equity Curve</CardTitle>
            <CardDescription>Portfolio value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full min-w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.equityCurve}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(val) => format(new Date(val), 'MMM d')}
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(val: number) => [formatCurrency(val), 'Value']}
                    labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-500">Initial Capital</span>
              <span className="text-sm font-medium">{formatCurrency(result.performance.initialCapital)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-500">Final Capital</span>
              <span className="text-sm font-medium">{formatCurrency(result.performance.finalCapital)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-500">Avg Win</span>
              <span className="text-sm font-medium text-emerald-600">+{result.performance.avgWin.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-500">Avg Loss</span>
              <span className="text-sm font-medium text-red-600">-{result.performance.avgLoss.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
              <span className="text-sm text-slate-500">Total Trades</span>
              <span className="text-sm font-medium">{result.performance.totalTrades}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trades Table */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Side</TableHead>
                <TableHead className="text-right">Entry Price</TableHead>
                <TableHead className="text-right">Exit Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium text-xs text-slate-500">
                    <div>{format(new Date(trade.entryDate), 'MMM d HH:mm')}</div>
                    <div>{format(new Date(trade.exitDate), 'MMM d HH:mm')}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={trade.side === 'long' ? 'default' : 'secondary'} className={
                      trade.side === 'long' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none' : 'bg-red-100 text-red-700 hover:bg-red-200 border-none'
                    }>
                      {trade.side.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-sm">
                    {formatCurrency(trade.entryPrice)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-sm">
                    {formatCurrency(trade.exitPrice)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-sm">
                    {trade.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={cn("text-sm font-medium tabular-nums", getValueColorClass(trade.pnl))}>
                      {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                    </div>
                    <div className={cn("text-xs tabular-nums", getValueColorClass(trade.pnlPercent))}>
                      {trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
