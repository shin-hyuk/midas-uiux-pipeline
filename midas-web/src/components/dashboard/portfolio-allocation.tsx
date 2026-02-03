'use client'

import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface Holding {
  symbol: string
  marketValue: number
  assetType: string
}

interface PortfolioAllocationProps {
  holdings: Holding[]
}

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6']

export function PortfolioAllocation({ holdings }: PortfolioAllocationProps) {
  const data = useMemo(() => {
    // Group by asset type
    const allocationByType = holdings.reduce((acc, holding) => {
      const type = holding.assetType === 'stocks' ? 'Stocks' : 
                   holding.assetType === 'crypto' ? 'Crypto' : 
                   holding.assetType === 'forex' ? 'Forex' : 'Other'
      
      acc[type] = (acc[type] || 0) + holding.marketValue
      return acc
    }, {} as Record<string, number>)

    return Object.entries(allocationByType).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value)
  }, [holdings])

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="col-span-1 bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Allocation</CardTitle>
        <CardDescription>Asset distribution by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full min-w-[200px]">
          <ResponsiveContainer width="100%" height={200} minWidth={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Value']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry: any) => {
                  const item = data.find(d => d.name === value)
                  const percent = item ? ((item.value / totalValue) * 100).toFixed(1) : 0
                  return <span className="text-xs text-slate-600 ml-1">{value} ({percent}%)</span>
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
