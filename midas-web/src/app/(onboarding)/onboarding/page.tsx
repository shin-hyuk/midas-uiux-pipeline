'use client'

/**
 * Avatar Selection Page
 * 
 * PRD: investment-avatar-selection.md (US-75)
 * 
 * Acceptance Criteria implemented:
 * 1. Gallery of 3 avatars with philosophy descriptions ✓
 * 2. Each avatar has unique visual identity (name, image, color scheme) ✓
 * 3. Selection during onboarding ✓
 * 4. Selected avatar influences all AI interactions ✓
 * 
 * UX Decision: Large cards with clear differentiation help users make
 * an informed choice. This is a high-impact decision that affects
 * the entire user experience with the AI assistant.
 * 
 * Avatar Personas (from PRD personal-investment-buddy.md):
 * - Value Vanguard: Conservative, Warren Buffett inspired
 * - Innovation Instigator: Aggressive, Cathie Wood inspired  
 * - Main Street Maverick: Practical, Peter Lynch inspired
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Rocket, Lightbulb, Check, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type AvatarType = 'value_vanguard' | 'innovation_instigator' | 'main_street_maverick'

/**
 * Avatar configurations from PRD personal-investment-buddy.md
 * 
 * UX Decision: Each avatar has a distinct visual identity through:
 * - Unique icon representing their philosophy
 * - Distinct color scheme (gradient backgrounds)
 * - Clear description of investment approach
 * 
 * Color choices:
 * - Value Vanguard: Sky/blue = calm, trustworthy, conservative
 * - Innovation Instigator: Violet/purple = bold, innovative, forward-thinking
 * - Main Street Maverick: Emerald/teal = practical, growth-oriented, grounded
 */
const avatars = [
  {
    id: 'value_vanguard' as AvatarType,
    name: 'Value Vanguard',
    // PRD: "Benjamin 'Ben' Graham Jr." - Inspired by Warren Buffett
    subtitle: 'The Patient Investor',
    icon: Shield,
    // UX: Blue tones = trust, stability, security (appropriate for conservative approach)
    gradient: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    philosophy: 'Long-term value investing with a focus on undervalued companies, strong fundamentals, and margin of safety.',
    traits: ['Patient & Disciplined', 'Fundamentals-First', 'Risk-Conscious'],
  },
  {
    id: 'innovation_instigator' as AvatarType,
    name: 'Innovation Instigator',
    // PRD: "Catharina 'Cat' Holm" - Inspired by Cathie Wood
    subtitle: 'The Growth Seeker',
    icon: Rocket,
    // UX: Violet/purple = creativity, ambition, innovation (fits aggressive growth focus)
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    philosophy: 'Disruptive innovation and exponential growth opportunities in technology, genomics, and cutting-edge sectors.',
    traits: ['Forward-Looking', 'High Growth Focus', 'Tech-Savvy'],
  },
  {
    id: 'main_street_maverick' as AvatarType,
    name: 'Main Street Maverick',
    // PRD: "Peter 'Pete' Finch" - Inspired by Peter Lynch
    subtitle: 'The Everyday Expert',
    icon: Lightbulb,
    // UX: Emerald/teal = growth, prosperity, practical wisdom
    gradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    philosophy: 'Invest in what you know. Find "tenbaggers" in everyday companies and industries often overlooked by Wall Street.',
    traits: ['Practical & Grounded', 'Hidden Gem Hunter', 'Relatable Insights'],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async () => {
    if (!selectedAvatar) {
      toast.error('Please select an investment avatar')
      return
    }

    setIsLoading(true)

    try {
      // Save avatar selection to backend
      if (user?.id) {
        await apiClient.put(`/api/v1/users/${user.id}`, {
          investment_avatar: selectedAvatar,
        })
      }
      
      // Update local state
      updateUser({ investmentAvatar: selectedAvatar })
      
      toast.success('Great choice! Your AI assistant is ready.')
      router.push('/')
    } catch (error) {
      // Even if API fails, allow user to continue (avatar stored locally)
      updateUser({ investmentAvatar: selectedAvatar })
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          Choose Your Investment Advisor
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select an avatar that aligns with your investment philosophy. 
          This will personalize your AI assistant&apos;s recommendations and communication style.
        </p>
      </div>

      {/* Avatar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {avatars.map((avatar) => {
          const Icon = avatar.icon
          const isSelected = selectedAvatar === avatar.id
          
          return (
            <Card
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={cn(
                "relative cursor-pointer transition-all duration-200",
                "hover:shadow-md",
                isSelected
                  ? `ring-2 ring-offset-2 ${avatar.borderColor} shadow-md`
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className={cn(
                  "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center",
                  `bg-gradient-to-br ${avatar.gradient}`
                )}>
                  <Check className="size-4 text-white" />
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                {/* Avatar icon with gradient background */}
                <div className={cn(
                  "w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center",
                  `bg-gradient-to-br ${avatar.gradient}`
                )}>
                  <Icon className="size-8 text-white" />
                </div>
                
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {avatar.name}
                </CardTitle>
                <CardDescription className={cn("text-sm font-medium", avatar.textColor)}>
                  {avatar.subtitle}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-slate-600 text-center mb-4">
                  {avatar.philosophy}
                </p>
                
                {/* Traits */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {avatar.traits.map((trait) => (
                    <span
                      key={trait}
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        avatar.bgLight,
                        avatar.textColor
                      )}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={!selectedAvatar || isLoading}
          size="lg"
          className="px-8 bg-slate-900 hover:bg-slate-800 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Setting up...
            </>
          ) : (
            <>
              Continue to Dashboard
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      {/* Skip option */}
      <p className="text-center mt-4 text-sm text-slate-500">
        You can change your avatar anytime in{' '}
        <button 
          onClick={() => router.push('/')}
          className="text-slate-700 hover:underline cursor-pointer"
        >
          Settings
        </button>
      </p>
    </div>
  )
}
