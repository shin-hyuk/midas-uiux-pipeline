'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Save } from 'lucide-react'
import { strategyService } from '@/lib/api'
import type { Strategy } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

const strategySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().optional(),
  type: z.enum(['momentum', 'mean_reversion', 'trend_following', 'arbitrage', 'dca', 'rotation', 'volatility']),
  assetClass: z.enum(['crypto', 'stocks', 'forex']),
  riskLevel: z.enum(['conservative', 'moderate', 'aggressive']),
  parameters: z.object({
    timeframe: z.string().default('1h'),
    stopLoss: z.coerce.number().min(0).max(100).default(5),
    takeProfit: z.coerce.number().min(0).max(500).default(10),
    leverage: z.coerce.number().min(1).max(100).default(1),
  }).optional(),
})

type StrategyFormValues = z.infer<typeof strategySchema>

interface StrategyFormProps {
  initialData?: Strategy
  isEditing?: boolean
}

export function StrategyForm({ initialData, isEditing = false }: StrategyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<StrategyFormValues>({
    resolver: zodResolver(strategySchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      type: (initialData?.type as any) || 'momentum',
      assetClass: (initialData?.assetClass as any) || 'crypto',
      riskLevel: (initialData?.riskLevel as any) || 'moderate',
      parameters: (initialData?.parameters as any) || {
        timeframe: '1h',
        stopLoss: 5,
        takeProfit: 10,
        leverage: 1,
      },
    },
  })

  const onSubmit = async (data: StrategyFormValues) => {
    setIsSubmitting(true)
    try {
      if (isEditing && initialData?.id) {
        // await strategyService.update(initialData.id, data)
        toast.success('Strategy updated successfully')
      } else {
        await strategyService.create(data)
        toast.success('Strategy created successfully')
      }
      router.push('/strategies')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Basic Information</CardTitle>
                <CardDescription>
                  Define the core identity of your strategy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strategy Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., BTC Momentum Alpha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the logic and goals..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Configuration</CardTitle>
                <CardDescription>
                  Set the technical parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Strategy Type <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="momentum">
                              <div className="flex flex-col">
                                <span>Momentum</span>
                                <span className="text-xs text-slate-500">Buy assets showing upward price trends</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="mean_reversion">
                              <div className="flex flex-col">
                                <span>Mean Reversion</span>
                                <span className="text-xs text-slate-500">Bet on prices returning to average</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="trend_following">
                              <div className="flex flex-col">
                                <span>Trend Following</span>
                                <span className="text-xs text-slate-500">Follow established market trends</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="dca">
                              <div className="flex flex-col">
                                <span>DCA</span>
                                <span className="text-xs text-slate-500">Dollar-cost averaging over time</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="arbitrage">
                              <div className="flex flex-col">
                                <span>Arbitrage</span>
                                <span className="text-xs text-slate-500">Exploit price differences across markets</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assetClass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asset Class <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select asset class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="crypto">Crypto</SelectItem>
                            <SelectItem value="stocks">Stocks</SelectItem>
                            <SelectItem value="forex">Forex</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="parameters.timeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeframe</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="15m">15m</SelectItem>
                            <SelectItem value="1h">1h</SelectItem>
                            <SelectItem value="4h">4h</SelectItem>
                            <SelectItem value="1d">1d</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parameters.stopLoss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stop Loss (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parameters.takeProfit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Take Profit (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Risk Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="riskLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Profile</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        Conservative: Lower leverage, tighter stops.<br/>
                        Aggressive: Higher leverage, wider stops.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parameters.leverage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Leverage (x)</FormLabel>
                      <FormControl>
                        <Input type="number" max={100} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="border-t border-slate-100 pt-6">
                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      {isEditing ? 'Update Strategy' : 'Create Strategy'}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
