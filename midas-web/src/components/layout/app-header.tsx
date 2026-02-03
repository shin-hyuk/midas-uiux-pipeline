'use client'

/**
 * App Header - Midas Design System
 * 
 * Figma Reference: Node 467-10981 (Header)
 * Shows page title, search, and user profile dropdown.
 */

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HelpCircle, LogOut, ChevronDown } from 'lucide-react'

// Page title mapping (USER-FOCUSED)
const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/portfolio': 'Portfolio',
  '/strategies': 'Strategies',
  '/backtest': 'Backtest',
  '/watchlists': 'Watchlists',
  '/assets': 'Assets',
  '/assistant': 'AI Assistant',
  '/settings': 'Settings',
}

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Get page title from path
  const getPageTitle = () => {
    // Exact match first
    if (pageTitles[pathname]) return pageTitles[pathname]
    
    // Check for partial matches (e.g., /strategies/123 -> Strategies)
    for (const [path, title] of Object.entries(pageTitles)) {
      if (path !== '/' && pathname.startsWith(path)) {
        return title
      }
    }
    
    return 'Midas'
  }

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-[#FAF8F5] border-b border-[#E8E4DF]">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-[#2D1B4E]">
        {getPageTitle()}
      </h1>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-3 h-auto py-2 px-3 hover:bg-[#E8E4DF]/50"
          >
            <Avatar className="size-8">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-[#C9A962] text-[#2D1B4E] text-sm font-medium">
                {user?.firstName?.[0] || user?.username?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-[#2D1B4E]">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user?.username || 'User'}
              </p>
              <p className="text-xs text-[#6B5B7A]">
                {user?.role || 'Member'}
              </p>
            </div>
            <ChevronDown className="size-4 text-[#6B5B7A]" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-48 bg-white border-[#E8E4DF]">
          <DropdownMenuItem 
            className="cursor-pointer text-[#2D1B4E] focus:bg-[#FAF8F5]"
            onClick={() => router.push('/help')}
          >
            <HelpCircle className="mr-2 size-4" />
            Help
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#E8E4DF]" />
          <DropdownMenuItem 
            className="cursor-pointer text-[#2D1B4E] focus:bg-[#FAF8F5]"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
