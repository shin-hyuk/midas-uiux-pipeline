'use client'

/**
 * AI Assistant Page - Midas Design System
 * 
 * Based on Figma design and midas.manus.space reference:
 * - Fonts: Geist (titles), Inter (body)
 * - Proactive AI recommendations
 * - Strategy cards with sparkline charts
 * - Floating chat input
 */

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  Send,
  TrendingUp,
  Loader2,
  Lightbulb,
  Mic,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Mini sparkline component
function Sparkline({ data, color = '#10B981' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 120
  const height = 40
  
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface StrategyCard {
  id: string
  name: string
  description: string
  tags: string[]
  metrics: { totalReturn: string; sharpe: string; maxDD: string }
  chartData: number[]
  chartColor: string
}

// Today's recommendation strategies
const recommendedStrategies: StrategyCard[] = [
  {
    id: 'dividend',
    name: 'Dividend Aristocrats',
    description: 'High-quality companies with 25+ years of consecutive dividend increases.',
    tags: ['Low Risk', 'Income', 'Large Cap'],
    metrics: { totalReturn: '+12.4%', sharpe: '1.8', maxDD: '-8.2%' },
    chartData: [20, 25, 22, 28, 32, 30, 35, 40, 38, 45, 48, 52],
    chartColor: '#10B981',
  },
  {
    id: 'global-min-vol',
    name: 'Global Min Volatility',
    description: 'Optimized portfolio selecting stocks with the lowest historical volatility.',
    tags: ['Low Risk', 'Global', 'Defensive'],
    metrics: { totalReturn: '+9.8%', sharpe: '2.1', maxDD: '-5.5%' },
    chartData: [30, 32, 31, 33, 35, 34, 36, 38, 37, 40, 42, 44],
    chartColor: '#10B981',
  },
  {
    id: 'consumer-staples',
    name: 'Consumer Staples Alpha',
    description: 'Focus on essential goods and services that perform well in recessions.',
    tags: ['Low Risk', 'Sector', 'Value'],
    metrics: { totalReturn: '+11.2%', sharpe: '1.5', maxDD: '-7.1%' },
    chartData: [25, 28, 26, 30, 32, 35, 33, 38, 42, 40, 45, 48],
    chartColor: '#10B981',
  },
]

// AI Advisor avatar URL (placeholder - using gradient fallback)
const AI_AVATAR = '/images/ai-advisor.png'

export default function AssistantPage() {
  const { user } = useAuth()
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    
    const userMsg = inputValue.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInputValue('')
    setIsTyping(true)
    setChatOpen(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: getAIResponse(userMsg) 
      }])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase()
    if (q.includes('portfolio') || q.includes('analyze')) {
      return "I've analyzed your portfolio. You have solid diversification but could benefit from adding some defensive positions. Your tech exposure at 45% is higher than recommended. Would you like me to suggest some rebalancing strategies?"
    }
    if (q.includes('risk') || q.includes('volatility')) {
      return "Based on current market conditions and your portfolio composition, I recommend shifting 15% towards defensive strategies. The strategies below offer lower volatility while maintaining solid returns."
    }
    return "I can help you analyze your portfolio, find suitable strategies, or discuss market trends. What would you like to explore?"
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 pb-24">
        {/* Today's Recommendation Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#3d2752] mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
            Today's Recommendation
          </h2>
          
          {/* AI Recommendation Card */}
          <div className="bg-white rounded-2xl border border-[#e8e4df] p-5 mb-6">
            <div className="flex items-start gap-4">
              {/* AI Avatar */}
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

          {/* Strategy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedStrategies.map((strategy) => (
              <div
                key={strategy.id}
                className="bg-white rounded-xl border border-[#e8e4df] p-5 hover:border-[#C9A962] hover:shadow-lg transition-all cursor-pointer group"
              >
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
                  <Sparkline data={strategy.chartData} color={strategy.chartColor} />
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
            ))}
          </div>
        </section>

        {/* Chat Messages (expanded when chatOpen) */}
        {chatOpen && messages.length > 0 && (
          <section className="mb-8">
            <div className="bg-white rounded-2xl border border-[#e8e4df] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#3d2752]">Conversation</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatOpen(false)}
                  className="text-[#666] hover:text-[#3d2752]"
                >
                  <ChevronUp className="size-4" />
                </Button>
              </div>
              
              <div className="space-y-4 max-h-80 overflow-y-auto" ref={scrollRef}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={cn(
                    "flex gap-3",
                    msg.role === 'user' && "flex-row-reverse"
                  )}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b98f61] to-[#8b6914] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">AI</span>
                      </div>
                    )}
                    <div className={cn(
                      "rounded-2xl px-4 py-3 max-w-md text-sm",
                      msg.role === 'user' 
                        ? "bg-[#3d2752] text-white rounded-tr-md"
                        : "bg-[#f3efed] text-[#3d2752] rounded-tl-md"
                    )} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b98f61] to-[#8b6914] flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">AI</span>
                    </div>
                    <div className="bg-[#f3efed] rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#b98f61] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-[#b98f61] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-[#b98f61] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Floating Chat Input Bar - Fixed at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
        <div className="bg-white rounded-full border border-[#e8e4df] shadow-lg shadow-black/5 flex items-center gap-3 px-4 py-2">
          {/* AI Avatar in input */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b98f61] to-[#8b6914] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-white text-sm font-semibold">AI</span>
          </div>
          
          <Input
            placeholder="Need any advice today?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 bg-transparent text-[#3d2752] placeholder:text-[#999] focus-visible:ring-0 text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            disabled={isTyping}
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
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="bg-[#3d2752] hover:bg-[#2d1b3e] text-white rounded-full w-10 h-10"
            >
              {isTyping ? (
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
