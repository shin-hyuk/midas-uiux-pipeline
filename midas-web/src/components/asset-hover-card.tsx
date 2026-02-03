"use client"

import { CalendarDays, TrendingUp, TrendingDown } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AssetIcon } from "@/components/ui/asset-icon"
import { formatCurrency, formatPercentage } from "@/lib/utils"

interface AssetHoverCardProps {
  symbol: string
  name?: string
  children: React.ReactNode
  assetType?: string
}

export function AssetHoverCard({ symbol, name, children, assetType = 'crypto' }: AssetHoverCardProps) {
  // Mock data simulation
  const price = symbol === 'BTC' ? 64230 : symbol === 'ETH' ? 3450 : 150.20
  const change = symbol === 'BTC' ? 2.4 : -1.2
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer hover:underline decoration-slate-300 underline-offset-4">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1">
              <AssetIcon symbol={symbol} assetType={assetType} className="size-full" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{symbol}</h4>
              <p className="text-xs text-slate-500">{name || 'Asset'}</p>
              
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm font-mono font-medium">
                  {formatCurrency(price)}
                </span>
                <span className={`text-xs flex items-center ${change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {change >= 0 ? <TrendingUp className="size-3 mr-1" /> : <TrendingDown className="size-3 mr-1" />}
                  {formatPercentage(change)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button size="sm" className="w-full text-xs h-8" variant="default">
            Trade
          </Button>
          <Button size="sm" className="w-full text-xs h-8" variant="outline">
            Analysis
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
