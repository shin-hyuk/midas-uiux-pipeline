'use client'

/**
 * Dashboard Layout - Midas Design System
 * 
 * User-focused layout with always-expanded sidebar for better navigation.
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { AppHeader } from '@/components/layout/app-header'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#FAF8F5]">
        {/* Sidebar skeleton - always expanded */}
        <div className="w-56 bg-[#2D1B4E] p-4">
          <div className="flex items-center gap-3 mb-8">
            <Skeleton className="h-8 w-8 rounded-lg bg-white/10" />
            <Skeleton className="h-5 w-20 bg-white/10" />
          </div>
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg bg-white/10" />
            ))}
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b border-[#E8E4DF] px-6 flex items-center justify-between bg-white">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="flex-1 p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-[#FAF8F5]">
      {/* Sidebar - always expanded */}
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
