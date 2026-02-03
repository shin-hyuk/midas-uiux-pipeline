'use client'

/**
 * Dashboard Home Page - Midas Design System (USER-FOCUSED)
 * 
 * Based on midas.manus.space reference:
 * - Watchlist with stock prices
 * - Today's AI Recommendation
 * - Strategy cards with sparklines
 * - Floating AI chat bar
 * - Latest Market News
 */

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  Activity,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Bell,
  Plus,
  Lightbulb,
  Send,
  Mic,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { strategyService } from '@/lib/api'
import type { Strategy } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { AssetIcon } from '@/components/ui/asset-icon'
import { AssetHoverCard } from '@/components/asset-hover-card'
import { PortfolioAllocation } from '@/components/dashboard/portfolio-allocation'
import { AIInsights } from '@/components/dashboard/ai-insights'
import ShinyText from '@/components/ui/shiny-text'
import SpotlightCard from '@/components/ui/spotlight-card'
import { CountUp } from '@/components/ui/count-up'
import { cn, formatCurrency, formatPercentage, getValueColorClass } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts'

// Mini sparkline component for strategy cards
function Sparkline({ data, color = '#10B981' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const height = 32
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Watchlist data (like midas.manus.space)
const watchlistItems = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 1.2, assetType: 'stocks' },
  { symbol: 'TSLA', name: 'Tesla', price: 240.10, change: 2.8, assetType: 'stocks' },
  { symbol: 'NVDA', name: 'NVIDIA', price: 550.00, change: 1.5, assetType: 'stocks' },
  { symbol: 'MSFT', name: 'Microsoft', price: 390.20, change: 0.8, assetType: 'stocks' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 142.65, change: -0.3, assetType: 'stocks' },
  { symbol: 'AMZN', name: 'Amazon', price: 155.30, change: 0.9, assetType: 'stocks' },
]

// Today's AI recommended strategies with sparkline data
const aiRecommendedStrategies = [
  {
    id: 'dividend',
    name: 'Dividend Aristocrats',
    description: 'High-quality companies with 25+ years of consecutive dividend increases.',
    tags: ['Low Risk', 'Income', 'Large Cap'],
    metrics: { totalReturn: '+12.4%', sharpe: '1.8', maxDD: '-8.2%' },
    chartData: [20, 25, 22, 28, 32, 30, 35, 40, 38, 45, 48, 52],
  },
  {
    id: 'global-min-vol',
    name: 'Global Min Volatility',
    description: 'Optimized portfolio selecting stocks with the lowest historical volatility.',
    tags: ['Low Risk', 'Global', 'Defensive'],
    metrics: { totalReturn: '+9.8%', sharpe: '2.1', maxDD: '-5.5%' },
    chartData: [30, 32, 31, 33, 35, 34, 36, 38, 37, 40, 42, 44],
  },
  {
    id: 'consumer-staples',
    name: 'Consumer Staples Alpha',
    description: 'Focus on essential goods and services that perform well in recessions.',
    tags: ['Low Risk', 'Sector', 'Value'],
    metrics: { totalReturn: '+11.2%', sharpe: '1.5', maxDD: '-7.1%' },
    chartData: [25, 28, 26, 30, 32, 35, 33, 38, 42, 40, 45, 48],
  },
]

// Latest market news
const latestNews = [
  {
    id: 1,
    title: 'Fed Signals Rate Cuts in Late 2024',
    source: 'Bloomberg',
    time: '2h ago',
    category: 'Macro',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=120&fit=crop',
  },
  {
    id: 2,
    title: 'Tech Giants Report Strong Q4 Earnings',
    source: 'Reuters',
    time: '4h ago',
    category: 'Stocks',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop',
  },
  {
    id: 3,
    title: 'SEC Approves New Crypto ETF Regulations',
    source: 'CoinDesk',
    time: '6h ago',
    category: 'Crypto',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&h=120&fit=crop',
  },
  {
    id: 4,
    title: 'Crypto Market Update: BTC Holds 42k',
    source: 'CoinDesk',
    time: '8h ago',
    category: 'Crypto',
    image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=200&h=120&fit=crop',
  },
]

// Mock portfolio data
const mockPortfolio = {
  totalValue: 125847.32,
  dayChange: 2341.56,
  dayChangePercent: 1.89,
  totalPnl: 15847.32,
  totalPnlPercent: 14.41,
  holdings: [
    { symbol: 'BTC', name: 'Bitcoin', assetType: 'crypto', marketValue: 48500, pnlPercent: 23.5 },
    { symbol: 'ETH', name: 'Ethereum', assetType: 'crypto', marketValue: 32100, pnlPercent: 18.2 },
    { symbol: 'SOL', name: 'Solana', assetType: 'crypto', marketValue: 12450, pnlPercent: 60.1 },
    { symbol: 'AAPL', name: 'Apple Inc.', assetType: 'stocks', marketValue: 9200, pnlPercent: 12.3 },
  ],
}

// Portfolio Performance Chart data
const portfolioPerformanceData = [
  { date: 'Jan', value: 100000 },
  { date: 'Feb', value: 105000 },
  { date: 'Mar', value: 98000 },
  { date: 'Apr', value: 112000 },
  { date: 'May', value: 118000 },
  { date: 'Jun', value: 125847 },
]

// Portfolio allocation for pie chart
const allocationData = [
  { name: 'Crypto', value: 73, color: '#C9A962' },
  { name: 'Stocks', value: 18, color: '#2D1B4E' },
  { name: 'ETFs', value: 6, color: '#4A9B9B' },
  { name: 'Cash', value: 3, color: '#E8E4DF' },
]

// Midas color palette
const MIDAS_COLORS = {
  purple: '#2D1B4E',
  purpleLight: '#3D2B5E',
  gold: '#C9A962',
  goldLight: '#D4B872',
  teal: '#4A9B9B',
  orange: '#E07B4A',
}

// Risk badge styling
const getRiskBadgeClass = (risk: string) => {
  switch (risk) {
    case 'conservative': return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'moderate': return 'bg-[#C9A962]/10 text-[#B89952] border-[#C9A962]/30'
    case 'aggressive': return 'bg-red-50 text-red-700 border-red-200'
    default: return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState('6months')
  const [watchlistFilter, setWatchlistFilter] = useState<'Stocks' | 'Crypto'>('Stocks')
  const [newsFilter, setNewsFilter] = useState<'All' | 'Macro' | 'Crypto' | 'Stocks'>('All')
  
  // AI Chat state
  const [aiInput, setAiInput] = useState('')
  const [aiTyping, setAiTyping] = useState(false)
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])

  // Greeting based on time of day
  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const handleAiSend = () => {
    if (!aiInput.trim()) return
    const userMsg = aiInput.trim()
    setAiMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setAiInput('')
    setAiTyping(true)
    
    setTimeout(() => {
      setAiMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Based on your portfolio, I recommend focusing on low-volatility strategies. Check out the recommendations below.' 
      }])
      setAiTyping(false)
    }, 1500)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await strategyService.getSystemStrategies()
        setStrategies(data.slice(0, 4))
      } catch {
        console.warn('Strategy API unavailable')
        setStrategies([])
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[#3d2752]" style={{ fontFamily: 'Geist, sans-serif' }}>
          {greeting()}, {user?.firstName || user?.username || 'Alex'}.
        </h1>
        <p className="text-[#666] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          Here&apos;s what&apos;s happening in your universe today.
        </p>
      </div>

      {/* Your Watchlist */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#3d2752]" style={{ fontFamily: 'Geist, sans-serif' }}>
            Your Watchlist
          </h2>
          <div className="flex gap-2">
            <Button 
              variant={watchlistFilter === 'Stocks' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setWatchlistFilter('Stocks')}
              className={watchlistFilter === 'Stocks' 
                ? 'bg-[#3d2752] text-white hover:bg-[#2d1b3e]' 
                : 'border-[#e8e4df] text-[#666]'}
            >
              Stocks
            </Button>
            <Button 
              variant={watchlistFilter === 'Crypto' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setWatchlistFilter('Crypto')}
              className={watchlistFilter === 'Crypto' 
                ? 'bg-[#3d2752] text-white hover:bg-[#2d1b3e]' 
                : 'border-[#e8e4df] text-[#666]'}
            >
              Crypto
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2">
          {watchlistItems.map((item) => (
            <div 
              key={item.symbol}
              className="flex-shrink-0 bg-white rounded-xl border border-[#e8e4df] p-4 min-w-[140px] hover:border-[#C9A962] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-[#3d2752]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.symbol}
                </p>
                <span className={cn(
                  'text-xs font-medium',
                  item.change >= 0 ? 'text-emerald-600' : 'text-red-500'
                )}>
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </span>
              </div>
              <p className="text-xs text-[#999] mb-1">{item.name}</p>
              <p className="text-lg font-semibold text-[#3d2752] tabular-nums">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Recommendation - AI Section */}
      <section>
        <h2 className="text-lg font-semibold text-[#3d2752] mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
          Today&apos;s Recommendation
        </h2>
        
        {/* AI Advisor Card */}
        <div className="bg-white rounded-2xl border border-[#e8e4df] p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b98f61] to-[#8b6914] flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-white text-lg font-semibold">AI</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="size-5 text-[#C9A962]" />
                <h3 className="font-semibold text-[#3d2752]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Focus on Low Volatility
                </h3>
              </div>
              <p className="text-[#666] text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                "Given the current market uncertainty, I suggest shifting 15% of your portfolio towards defensive strategies. 
                Check out the recommendations below that fit your portfolio."
              </p>
            </div>
          </div>
        </div>

        {/* Strategy Cards with Sparklines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiRecommendedStrategies.map((strategy) => (
            <Link
              key={strategy.id}
              href={`/strategies/${strategy.id}`}
              className="block group"
            >
              <div className="bg-white rounded-xl border border-[#e8e4df] p-5 hover:border-[#C9A962] hover:shadow-lg transition-all h-full">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {strategy.tags.map((tag, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-xs border-[#e8e4df] text-[#666] bg-[#f5f5f5]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title & Description */}
                <h4 className="font-semibold text-[#3d2752] mb-1 group-hover:text-[#C9A962] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {strategy.name}
                </h4>
                <p className="text-sm text-[#666] mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {strategy.description}
                </p>

                {/* Sparkline Chart */}
                <div className="mb-4">
                  <Sparkline data={strategy.chartData} color="#10B981" />
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="text-[#999] uppercase tracking-wider mb-0.5">Total Return</p>
                    <p className="font-semibold text-emerald-600">{strategy.metrics.totalReturn}</p>
                  </div>
                  <div>
                    <p className="text-[#999] uppercase tracking-wider mb-0.5">Sharpe</p>
                    <p className="font-semibold text-[#3d2752]">{strategy.metrics.sharpe}</p>
                  </div>
                  <div>
                    <p className="text-[#999] uppercase tracking-wider mb-0.5">Max DD</p>
                    <p className="font-semibold text-red-500">{strategy.metrics.maxDD}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Market News */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#3d2752]" style={{ fontFamily: 'Geist, sans-serif' }}>
            Latest Market News
          </h2>
          <div className="flex gap-2">
            {(['All', 'Macro', 'Crypto', 'Stocks'] as const).map((filter) => (
              <Button 
                key={filter}
                variant={newsFilter === filter ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setNewsFilter(filter)}
                className={newsFilter === filter 
                  ? 'bg-[#3d2752] text-white hover:bg-[#2d1b3e] h-7 px-3 text-xs' 
                  : 'text-[#666] h-7 px-3 text-xs hover:text-[#3d2752]'}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestNews
            .filter(news => newsFilter === 'All' || news.category === newsFilter)
            .map((news) => (
            <div 
              key={news.id}
              className="bg-white rounded-xl border border-[#e8e4df] overflow-hidden hover:border-[#C9A962] transition-all cursor-pointer group"
            >
              <div className="h-28 bg-[#f3efed] overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-[#3d2752] text-sm mb-2 line-clamp-2 group-hover:text-[#C9A962] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {news.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#999]">
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating AI Chat Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
        <div className="bg-white rounded-full border border-[#e8e4df] shadow-lg shadow-black/5 flex items-center gap-3 px-4 py-2">
          {/* AI Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b98f61] to-[#8b6914] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-white text-sm font-semibold">AI</span>
          </div>
          
          <Input
            placeholder="Need any advice today?"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
            className="flex-1 border-0 bg-transparent text-[#3d2752] placeholder:text-[#999] focus-visible:ring-0 text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            disabled={aiTyping}
          />
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#999] hover:text-[#3d2752] hover:bg-transparent"
            >
              <Mic className="size-5" />
            </Button>
            
            <Button
              onClick={handleAiSend}
              disabled={!aiInput.trim() || aiTyping}
              size="icon"
              className="bg-[#3d2752] hover:bg-[#2d1b3e] text-white rounded-full w-10 h-10"
            >
              {aiTyping ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <ArrowUpRight className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
