'use client'

import { useState } from 'react'
import { Coins, TrendingUp, DollarSign, BarChart3 } from 'lucide-react'
import { getAssetIconUrl, getCryptoIconFallbackUrl, guessAssetType } from '@/lib/icons'
import { cn } from '@/lib/utils'

interface AssetIconProps {
  symbol: string
  assetType?: 'crypto' | 'stock' | 'forex' | string
  className?: string
  showFallback?: boolean
}

export function AssetIcon({ symbol, assetType, className, showFallback = true }: AssetIconProps) {
  const [errorCount, setErrorCount] = useState(0)
  
  // Normalize type or guess - handle both 'stock' and 'stocks'
  const normalizeType = (t: string | undefined): 'crypto' | 'stock' | 'forex' => {
    if (!t) return guessAssetType(symbol)
    const lower = t.toLowerCase()
    if (lower === 'stocks' || lower === 'stock') return 'stock'
    if (lower === 'crypto' || lower === 'cryptocurrency') return 'crypto'
    if (lower === 'forex' || lower === 'fx') return 'forex'
    return guessAssetType(symbol)
  }
  
  const type = normalizeType(assetType)
  
  // Get icon URL based on error count (try primary, then fallback)
  const getIconUrl = () => {
    if (errorCount === 0) {
      return getAssetIconUrl(symbol, type)
    } else if (errorCount === 1 && type === 'crypto') {
      // Try fallback for crypto
      return getCryptoIconFallbackUrl(symbol)
    }
    return null
  }
  
  const iconUrl = getIconUrl()
  
  // Show fallback icon if all sources failed
  if (!iconUrl || errorCount > 1) {
    if (!showFallback) return null
    
    const iconClass = cn("text-slate-400", className)
    
    switch (type) {
      case 'crypto': return <Coins className={iconClass} />
      case 'stock': 
      case 'stocks': return <TrendingUp className={iconClass} />
      case 'forex': return <DollarSign className={iconClass} />
      default: return <BarChart3 className={iconClass} />
    }
  }

  return (
    <img 
      src={iconUrl} 
      alt={symbol} 
      className={cn("object-contain", className)}
      onError={() => setErrorCount(prev => prev + 1)}
      loading="lazy"
    />
  )
}
