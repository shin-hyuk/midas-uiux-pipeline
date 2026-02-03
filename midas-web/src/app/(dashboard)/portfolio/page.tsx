'use client'

/**
 * Portfolio Page
 * 
 * PRD: portfolio-management.md
 * Displays user's holdings with performance metrics.
 * 
 * Data Source: Real API midas-user (/api/v1/userportfolio)
 * Note: Mock data used while exchange integration (midas-exchange) is pending
 * 
 * MCP Components Used:
 * - CountUp from reactbits for animated KPI values
 */

import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  Coins,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AssetIcon } from '@/components/ui/asset-icon'
import { PortfolioAllocation } from '@/components/dashboard/portfolio-allocation'
import { RiskMetrics } from '@/components/dashboard/risk-metrics'
import { CountUp } from '@/components/ui/count-up'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn, formatCurrency, formatPercentage, getValueColorClass } from '@/lib/utils'

// Mock portfolio data - Real API: midas-user /api/v1/userportfolio
// Using mock because exchange integration not implemented
const mockPortfolio = {
  totalValue: 125847.32,
  dayChange: 2341.56,
  dayChangePercent: 1.89,
  totalPnl: 15847.32,
  totalPnlPercent: 14.41,
  holdings: [
    { symbol: 'BTC', name: 'Bitcoin', assetType: 'crypto', quantity: 0.85, avgCost: 42000, currentPrice: 57058, marketValue: 48500, pnl: 12799, pnlPercent: 35.87 },
    { symbol: 'ETH', name: 'Ethereum', assetType: 'crypto', quantity: 12, avgCost: 2200, currentPrice: 2675, marketValue: 32100, pnl: 5700, pnlPercent: 21.59 },
    { symbol: 'SOL', name: 'Solana', assetType: 'crypto', quantity: 85, avgCost: 92, currentPrice: 146.47, marketValue: 12450, pnl: 4630, pnlPercent: 59.2 },
    { symbol: 'AAPL', name: 'Apple Inc.', assetType: 'stocks', quantity: 50, avgCost: 165, currentPrice: 184, marketValue: 9200, pnl: 950, pnlPercent: 11.52 },
    { symbol: 'NVDA', name: 'NVIDIA', assetType: 'stocks', quantity: 10, avgCost: 450, currentPrice: 875, marketValue: 8750, pnl: 4250, pnlPercent: 94.44 },
    { symbol: 'MSFT', name: 'Microsoft', assetType: 'stocks', quantity: 20, avgCost: 380, currentPrice: 415, marketValue: 8300, pnl: 700, pnlPercent: 9.21 },
  ],
}

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#3d2752]">Portfolio</h1>
          <p className="text-sm text-[#6B5B7A] mt-1">
            Track and manage your investments
          </p>
        </div>
        <Link href="/portfolio/connect">
          <Button className="cursor-pointer bg-[#C9A962] hover:bg-[#B89952] text-[#2D1B4E]">
            <Plus className="size-4 mr-2" />
            Connect Exchange
          </Button>
        </Link>
      </div>

      {/* KPI Cards with animated values from reactbits CountUp */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-[#E8E4DF] hover:border-[#C9A962] transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-[#6B5B7A]">
              <Wallet className="size-4" />
              Total Value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums text-[#3d2752]">
              <CountUp to={mockPortfolio.totalValue} prefix="$" duration={1} separator="," decimals={2} />
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#E8E4DF] hover:border-[#C9A962] transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-[#6B5B7A]">
              <TrendingUp className="size-4" />
              Day Change
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={cn('text-2xl font-semibold tabular-nums', getValueColorClass(mockPortfolio.dayChange))}>
              <CountUp to={mockPortfolio.dayChange} prefix={mockPortfolio.dayChange >= 0 ? '+$' : '-$'} duration={1} separator="," decimals={2} />
            </p>
            <p className={cn('text-sm tabular-nums', getValueColorClass(mockPortfolio.dayChangePercent))}>
              <CountUp to={mockPortfolio.dayChangePercent} suffix="%" duration={1} prefix={mockPortfolio.dayChangePercent >= 0 ? '+' : ''} decimals={2} />
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#E8E4DF] hover:border-[#C9A962] transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-[#6B5B7A]">
              <PieChart className="size-4" />
              Total P&L
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={cn('text-2xl font-semibold tabular-nums', getValueColorClass(mockPortfolio.totalPnl))}>
              <CountUp to={mockPortfolio.totalPnl} prefix={mockPortfolio.totalPnl >= 0 ? '+$' : '-$'} duration={1} separator="," decimals={2} />
            </p>
            <p className={cn('text-sm tabular-nums', getValueColorClass(mockPortfolio.totalPnlPercent))}>
              <CountUp to={mockPortfolio.totalPnlPercent} suffix="%" duration={1} prefix={mockPortfolio.totalPnlPercent >= 0 ? '+' : ''} decimals={2} />
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-[#E8E4DF] hover:border-[#C9A962] transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-[#6B5B7A]">
              <BarChart3 className="size-4" />
              Holdings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums text-[#3d2752]">
              <CountUp to={mockPortfolio.holdings.length} duration={1} />
            </p>
            <p className="text-sm text-[#6B5B7A]">assets</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings Table */}
        <Card className="lg:col-span-2 bg-white border-[#E8E4DF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#3d2752]">Holdings</CardTitle>
            <CardDescription className="text-[#6B5B7A]">Your current asset allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-[#E8E4DF]">
                  <TableHead className="text-[#6B5B7A]">Asset</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Quantity</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Avg Cost</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Current Price</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">Market Value</TableHead>
                  <TableHead className="text-right text-[#6B5B7A]">P&L</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPortfolio.holdings.map((holding) => (
                  <TableRow key={holding.symbol} className="hover:bg-[#FAF8F5] border-[#E8E4DF] transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#E8E4DF] flex items-center justify-center overflow-hidden p-1">
                          <AssetIcon symbol={holding.symbol} assetType={holding.assetType} className="size-full" />
                        </div>
                        <div>
                          <p className="font-medium text-[#3d2752]">{holding.symbol}</p>
                          <p className="text-xs text-[#6B5B7A]">{holding.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-[#3d2752]">{holding.quantity}</TableCell>
                    <TableCell className="text-right tabular-nums text-[#6B5B7A]">{formatCurrency(holding.avgCost)}</TableCell>
                    <TableCell className="text-right tabular-nums text-[#3d2752]">{formatCurrency(holding.currentPrice)}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium text-[#3d2752]">{formatCurrency(holding.marketValue)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {holding.pnl >= 0 ? (
                          <ArrowUpRight className="size-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="size-4 text-red-600" />
                        )}
                        <div>
                          <p className={cn('tabular-nums font-medium', getValueColorClass(holding.pnl))}>
                            {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)}
                          </p>
                          <p className={cn('text-xs tabular-nums', getValueColorClass(holding.pnlPercent))}>
                            {formatPercentage(holding.pnlPercent)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sidebar: Allocation & Risk */}
        <div className="space-y-6">
          <PortfolioAllocation holdings={mockPortfolio.holdings} />
          <RiskMetrics />
        </div>
      </div>
    </div>
  )
}
