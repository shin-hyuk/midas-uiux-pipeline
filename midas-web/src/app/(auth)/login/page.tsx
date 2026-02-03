'use client'

/**
 * Login Page - Midas Design System
 * 
 * Figma Reference: Node 639-1976 (Sign In)
 * Full-screen purple gradient with Midas branding.
 */

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, HelpCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { MidasLogo } from '@/components/ui/midas-logo'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.login || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      await login({
        login: formData.login,
        password: formData.password,
      })
      
      toast.success('Welcome back!')
      router.push('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#2D1B4E] to-[#1D0B3E] flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-10">
        <MidasLogo variant="secondary" size="xl" showText />
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Midas ID / Email */}
          <div className="space-y-2">
            <Label htmlFor="login" className="text-white/80 text-sm">
              Midas ID
            </Label>
            <Input
              id="login"
              type="text"
              placeholder="you@example.com"
              value={formData.login}
              onChange={(e) => setFormData(prev => ({ ...prev, login: e.target.value }))}
              className="h-12 bg-[#3D2B5E] border-[#3D2B5E] text-white placeholder:text-white/40 focus:border-[#C9A962] focus:ring-[#C9A962]"
              disabled={isLoading}
            />
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80 text-sm">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="h-12 bg-[#3D2B5E] border-[#3D2B5E] text-white placeholder:text-white/40 pr-12 focus:border-[#C9A962] focus:ring-[#C9A962]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 cursor-pointer transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
              }
              className="border-white/30 data-[state=checked]:bg-[#C9A962] data-[state=checked]:border-[#C9A962]"
            />
            <label
              htmlFor="remember"
              className="text-sm text-white/70 cursor-pointer"
            >
              Remember Me
            </label>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-white text-[#2D1B4E] hover:bg-white/90 border-2 border-[#C9A962] font-medium cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#2D1B4E] px-4 text-white/50">OR</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-white text-[#2D1B4E] hover:bg-white/90 border-2 border-[#C9A962] font-medium cursor-pointer"
          >
            <svg className="size-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Links Row */}
          <div className="flex items-center justify-between text-sm">
            <Link 
              href="/register" 
              className="text-white/70 hover:text-white flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="size-4" />
              Need an account
            </Link>
            <Link 
              href="/forgot-password" 
              className="text-white/70 hover:text-white underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </form>

        {/* Terms */}
        <div className="mt-8 text-center text-xs text-white/50">
          <p>
            By signing in to your account you agree to our{' '}
            <Link href="/terms" className="underline hover:text-white/70">
              terms and conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-white/70">
              privacy policy
            </Link>
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-white/40">
          Copyright © 2025 Maverick Technology | All Rights Reserved
        </div>
      </div>
    </div>
  )
}
