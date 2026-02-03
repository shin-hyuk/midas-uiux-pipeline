'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StrategyForm } from '@/components/strategies/strategy-form'

export default function CreateStrategyPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
            <h1 className="text-2xl font-semibold text-slate-900">Create Strategy</h1>
            <p className="text-sm text-slate-500 mt-1">
              Design a new trading strategy using the builder
            </p>
          </div>
        </div>
        <Link href="/strategies">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <X className="size-4 mr-2" />
            Cancel
          </Button>
        </Link>
      </div>

      <StrategyForm />
    </div>
  )
}
