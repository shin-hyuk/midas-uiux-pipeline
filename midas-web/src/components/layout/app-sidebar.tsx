'use client'

/**
 * App Sidebar - Midas Design System
 * 
 * Always-expanded sidebar with clear navigation and user info.
 * Based on user stories: easy navigation, clear feature discovery.
 */

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  TrendingUp,
  Sparkles,
  Wallet,
  List,
  Settings,
  BarChart3,
  LineChart,
  Search,
  LogOut,
  HelpCircle,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MidasSymbol } from '@/components/ui/midas-logo'

// Main navigation - grouped by function
const mainNavItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Portfolio', href: '/portfolio', icon: Wallet },
  { label: 'Strategies', href: '/strategies', icon: TrendingUp },
  { label: 'Backtest', href: '/backtest', icon: BarChart3 },
]

const discoverNavItems = [
  { label: 'Watchlists', href: '/watchlists', icon: List },
  { label: 'Assets', href: '/assets', icon: LineChart },
]

const toolsNavItems = [
  { label: 'AI Assistant', href: '/assistant', icon: Sparkles },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const NavLink = ({ item }: { item: { label: string; href: string; icon: any } }) => {
    const Icon = item.icon
    const isActive = pathname === item.href || 
      (item.href !== '/' && pathname.startsWith(item.href))

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-[#C9A962] text-[#2D1B4E] shadow-sm"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        )}
      >
        <Icon className="size-5 flex-shrink-0" />
        <span>{item.label}</span>
      </Link>
    )
  }

  return (
    <aside className="flex flex-col w-56 h-screen bg-[#2D1B4E]">
      {/* Logo */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <MidasSymbol variant="secondary" size={32} />
          <span className="text-xl font-light tracking-[0.15em] text-white">
            MIDAS
          </span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#C9A962] focus:ring-[#C9A962]/20 h-9 text-sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        {/* Main */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Discover Section */}
        <div className="mt-6 mb-2">
          <p className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider">
            Discover
          </p>
        </div>
        <nav className="space-y-1">
          {discoverNavItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Tools Section */}
        <div className="mt-6 mb-2">
          <p className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider">
            Tools
          </p>
        </div>
        <nav className="space-y-1">
          {toolsNavItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>
      </ScrollArea>

      {/* User Profile Footer */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <Avatar className="size-9 border-2 border-[#C9A962]/30">
            <AvatarFallback className="bg-[#C9A962]/20 text-[#C9A962] text-sm font-medium">
              {user?.firstName?.[0] || user?.username?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName || user?.username || 'User'}
            </p>
            <p className="text-xs text-white/50 truncate">
              {user?.role || 'Member'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-1 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-white/60 hover:text-white hover:bg-white/10 text-xs h-8"
          >
            <HelpCircle className="size-4 mr-1.5" />
            Help
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex-1 text-white/60 hover:text-red-400 hover:bg-red-500/10 text-xs h-8"
          >
            <LogOut className="size-4 mr-1.5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}
