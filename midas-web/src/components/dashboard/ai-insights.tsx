'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight, ShieldAlert, TrendingUp, PieChart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AIInsights() {
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Sparkles className="size-5 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              AI Assistant
            </CardTitle>
            <CardDescription className="text-indigo-600/80">
              3 new recommendations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          variant="ghost" 
          className="w-full justify-between group hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-indigo-100 h-auto py-3" 
          asChild
        >
          <Link href="/assistant?action=analyze-portfolio">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-full">
                <ShieldAlert className="size-4 text-emerald-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">Portfolio Health</div>
                <div className="text-xs text-slate-500">Risk level is moderate</div>
              </div>
            </div>
            <ArrowRight className="size-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </Link>
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-between group hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-indigo-100 h-auto py-3" 
          asChild
        >
          <Link href="/assistant?action=recommend-strategy">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-full">
                <TrendingUp className="size-4 text-amber-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">New Opportunities</div>
                <div className="text-xs text-slate-500">2 strategies match your profile</div>
              </div>
            </div>
            <ArrowRight className="size-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </Link>
        </Button>

        <Button 
          variant="ghost" 
          className="w-full justify-between group hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-indigo-100 h-auto py-3" 
          asChild
        >
          <Link href="/assistant?action=market-insights">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-50 rounded-full">
                <PieChart className="size-4 text-sky-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">Market Briefing</div>
                <div className="text-xs text-slate-500">Crypto market up 2.5% today</div>
              </div>
            </div>
            <ArrowRight className="size-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
