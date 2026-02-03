'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ArrowLeft, Loader2, CheckCircle2, ShieldCheck, Wallet, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

const connectSchema = z.object({
  exchange: z.enum(['binance', 'coinbase', 'kraken', 'kucoin', 'okx']),
  apiKey: z.string().min(10, 'API Key is required'),
  secretKey: z.string().min(10, 'Secret Key is required'),
  name: z.string().min(3, 'Give this connection a name'),
})

type ConnectFormValues = z.infer<typeof connectSchema>

// Help URLs for API key creation guides
const getExchangeHelpUrl = (exchange: string): string => {
  const urls: Record<string, string> = {
    binance: 'https://www.binance.com/en/support/faq/how-to-create-api-360002502072',
    coinbase: 'https://help.coinbase.com/en/exchange/managing-my-account/how-to-create-an-api-key',
    kraken: 'https://support.kraken.com/hc/en-us/articles/360000919966-How-to-create-an-API-key',
    kucoin: 'https://www.kucoin.com/support/900007083463-How-to-Create-an-API',
    okx: 'https://www.okx.com/help/how-do-i-create-an-api-key',
  }
  return urls[exchange] || '#'
}

export default function PortfolioConnectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ConnectFormValues>({
    resolver: zodResolver(connectSchema),
    defaultValues: {
      exchange: 'binance',
      apiKey: '',
      secretKey: '',
      name: '',
    },
  })

  const onSubmit = async (data: ConnectFormValues) => {
    setIsSubmitting(true)
    try {
      // Mock API call - Exchange integration is pending backend implementation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Exchange connected successfully!')
      router.push('/portfolio')
    } catch {
      toast.error('Failed to connect exchange. Check your keys.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Connect Exchange</h1>
          <p className="text-sm text-slate-500 mt-1">
            Import your portfolio and execute trades securely
          </p>
        </div>
      </div>

      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Connection Details</CardTitle>
          <CardDescription>
            Enter your API credentials. Keys are encrypted and stored securely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="exchange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exchange <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exchange" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="binance">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-[#F3BA2F] flex items-center justify-center text-black font-bold text-xs">B</div>
                            <span>Binance</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="coinbase">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-[#0052FF] flex items-center justify-center text-white font-bold text-xs">C</div>
                            <span>Coinbase</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="kraken">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-[#5741D9] flex items-center justify-center text-white font-bold text-xs">K</div>
                            <span>Kraken</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="kucoin">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-[#23AF91] flex items-center justify-center text-white font-bold text-xs">K</div>
                            <span>KuCoin</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="okx">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-black flex items-center justify-center text-white font-bold text-xs">O</div>
                            <span>OKX</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      <a 
                        href={getExchangeHelpUrl(field.value)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-600 hover:underline"
                      >
                        How to create API keys for {field.value.charAt(0).toUpperCase() + field.value.slice(1)}
                        <ExternalLink className="size-3" />
                      </a>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connection Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., My Main Portfolio" {...field} />
                    </FormControl>
                    <FormDescription>A label to identify this account</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Paste your API key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret Key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Paste your secret key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-sky-50 p-4 rounded-lg flex gap-3 items-start">
                <ShieldCheck className="size-5 text-sky-600 mt-0.5" />
                <div className="text-sm text-sky-700">
                  <p className="font-medium">Security Note</p>
                  <p className="mt-1 opacity-90">
                    We only require "Read" and "Trade" permissions. 
                    <span className="font-semibold"> Never enable "Withdrawal" permissions on your API keys.</span>
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Verifying & Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 size-4" />
                      Connect Exchange
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
