'use client'

import { Shield, Activity, TrendingDown, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function RiskMetrics() {
  // Mock risk data - PRD 3.3.1
  const riskScore = 65 // 0-100
  const sharpeRatio = 1.8
  const maxDrawdown = 12.5
  const beta = 1.1

  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Shield className="size-5 text-slate-500" />
          Risk Analysis
        </CardTitle>
        <CardDescription>Portfolio risk metrics and exposure</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Risk Score</span>
            <span className="font-medium text-amber-600">Moderate ({riskScore}/100)</span>
          </div>
          <Progress value={riskScore} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              Sharpe
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-3" />
                  </TooltipTrigger>
                  <TooltipContent>Risk-adjusted return (higher is better)</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-lg font-semibold text-slate-900">{sharpeRatio}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              Drawdown
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-3" />
                  </TooltipTrigger>
                  <TooltipContent>Maximum observed loss from a peak</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-lg font-semibold text-red-600">-{maxDrawdown}%</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              Beta
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-3" />
                  </TooltipTrigger>
                  <TooltipContent>Volatility relative to market (1.0 = market)</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-lg font-semibold text-slate-900">{beta}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
