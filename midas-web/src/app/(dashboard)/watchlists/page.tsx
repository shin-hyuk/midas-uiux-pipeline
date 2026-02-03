'use client'

/**
 * Watchlists Page
 * 
 * PRD: watchlists.md
 * Data Source: Real API midas-user (/api/v1/watchlist)
 */

import { useState } from 'react'
import {
  Plus,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  List,
  Trash,
  Edit,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AssetIcon } from '@/components/ui/asset-icon'
import { cn, formatCurrency, formatPercentage, getValueColorClass } from '@/lib/utils'

// Mock watchlist data - Real API: midas-user /api/v1/watchlist
const mockWatchlists = [
  {
    id: 'wl-1',
    name: 'Top Crypto',
    description: 'Major cryptocurrencies to watch',
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', price: 57058, change24h: 2.5 },
      { symbol: 'ETH', name: 'Ethereum', price: 2675, change24h: 3.2 },
      { symbol: 'SOL', name: 'Solana', price: 146.47, change24h: -1.8 },
    ],
  },
  {
    id: 'wl-2',
    name: 'Tech Stocks',
    description: 'Technology sector leaders',
    assets: [
      { symbol: 'AAPL', name: 'Apple', price: 184, change24h: 0.8 },
      { symbol: 'NVDA', name: 'NVIDIA', price: 875, change24h: 4.2 },
      { symbol: 'MSFT', name: 'Microsoft', price: 415, change24h: 1.1 },
    ],
  },
  {
    id: 'wl-3',
    name: 'AI Leaders',
    description: 'Companies leading in AI',
    assets: [
      { symbol: 'NVDA', name: 'NVIDIA', price: 875, change24h: 4.2 },
      { symbol: 'GOOGL', name: 'Alphabet', price: 142, change24h: 0.5 },
      { symbol: 'META', name: 'Meta', price: 485, change24h: 2.1 },
    ],
  },
]

export default function WatchlistsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Watchlists</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track assets you&apos;re interested in
          </p>
        </div>
        <Button className="cursor-pointer">
          <Plus className="size-4" />
          Create Watchlist
        </Button>
      </div>

      {/* Watchlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWatchlists.map((watchlist) => (
          <Card key={watchlist.id} className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {watchlist.name}
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  {watchlist.description}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="size-8 p-0 cursor-pointer">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <Plus className="size-4 mr-2" />
                    Add Assets
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Edit className="size-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 cursor-pointer">
                    <Trash className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {watchlist.assets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-1">
                        <AssetIcon symbol={asset.symbol} className="size-full" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{asset.symbol}</p>
                        <p className="text-xs text-slate-500">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium tabular-nums text-slate-900">
                        {formatCurrency(asset.price)}
                      </p>
                      <div className="flex items-center justify-end gap-1">
                        {asset.change24h >= 0 ? (
                          <TrendingUp className="size-3 text-emerald-600" />
                        ) : (
                          <TrendingDown className="size-3 text-red-600" />
                        )}
                        <span className={cn('text-xs tabular-nums', getValueColorClass(asset.change24h))}>
                          {formatPercentage(asset.change24h)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty state for creating new watchlist */}
        <Card className="bg-white border-slate-200 border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Plus className="size-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-900 mb-1">Create New Watchlist</p>
            <p className="text-xs text-slate-500 mb-3">Group assets you want to track</p>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Plus className="size-4" />
              Create
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
