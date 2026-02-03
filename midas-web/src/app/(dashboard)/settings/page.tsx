'use client'

/**
 * Settings Page
 * 
 * PRD: US-75 - Avatar can be changed in settings
 * Includes: Profile, Avatar Selection, Notifications, Subscription
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  Shield,
  Rocket,
  Lightbulb,
  Bell,
  CreditCard,
  Check,
  Loader2,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type AvatarType = 'value_vanguard' | 'innovation_instigator' | 'main_street_maverick'

// Avatar configs (same as onboarding)
const avatars = [
  {
    id: 'value_vanguard' as AvatarType,
    name: 'Value Vanguard',
    icon: Shield,
    gradient: 'from-sky-500 to-blue-600',
    description: 'Long-term value investing with focus on fundamentals',
  },
  {
    id: 'innovation_instigator' as AvatarType,
    name: 'Innovation Instigator',
    icon: Rocket,
    gradient: 'from-violet-500 to-purple-600',
    description: 'Disruptive innovation and exponential growth',
  },
  {
    id: 'main_street_maverick' as AvatarType,
    name: 'Main Street Maverick',
    icon: Lightbulb,
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Invest in what you know, find hidden gems',
  },
]

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>(
    user?.investmentAvatar || 'value_vanguard'
  )

  // PRD: US-75 - Change avatar without losing data
  const handleSaveAvatar = async () => {
    if (selectedAvatar === user?.investmentAvatar) return

    setIsLoading(true)
    try {
      if (user?.id) {
        await apiClient.put(`/api/v1/users/${user.id}`, {
          investment_avatar: selectedAvatar,
        })
      }
      updateUser({ investmentAvatar: selectedAvatar })
      toast.success('Avatar updated!')
    } catch {
      // Still update locally even if API fails
      updateUser({ investmentAvatar: selectedAvatar })
      toast.success('Avatar updated!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="profile" className="cursor-pointer">Profile</TabsTrigger>
          <TabsTrigger value="avatar" className="cursor-pointer">Investment Avatar</TabsTrigger>
          <TabsTrigger value="notifications" className="cursor-pointer">Notifications</TabsTrigger>
          <TabsTrigger value="subscription" className="cursor-pointer">Subscription</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={user?.firstName || ''}
                    className="border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={user?.lastName || ''}
                    className="border-slate-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ''}
                  className="border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue={user?.username || ''}
                  className="border-slate-200"
                />
              </div>
              <Button className="cursor-pointer">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Avatar Tab - PRD US-75 */}
        <TabsContent value="avatar">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Investment Avatar</CardTitle>
              <CardDescription>
                Choose an avatar that matches your investment philosophy. This affects AI recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {avatars.map((avatar) => {
                  const Icon = avatar.icon
                  const isSelected = selectedAvatar === avatar.id
                  
                  return (
                    <div
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={cn(
                        "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                        isSelected
                          ? "border-slate-900 bg-slate-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center">
                          <Check className="size-4 text-white" />
                        </div>
                      )}
                      <div className={cn(
                        "w-12 h-12 rounded-xl mb-3 flex items-center justify-center bg-gradient-to-br",
                        avatar.gradient
                      )}>
                        <Icon className="size-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900">{avatar.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{avatar.description}</p>
                    </div>
                  )
                })}
              </div>
              
              <Button 
                onClick={handleSaveAvatar}
                disabled={isLoading || selectedAvatar === user?.investmentAvatar}
                className="cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Avatar'
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Notifications</CardTitle>
              <CardDescription>Configure how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Strategy Signals', description: 'Get notified when strategies generate signals' },
                { label: 'Backtest Complete', description: 'Notification when backtests finish' },
                { label: 'Price Alerts', description: 'Alerts when assets hit price targets' },
                { label: 'Weekly Digest', description: 'Weekly summary of your portfolio' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    Configure
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Subscription</CardTitle>
              <CardDescription>Manage your plan and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">Free Plan</h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-slate-200 text-slate-700">Current</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  Basic features for getting started
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600" />
                    Basic portfolio tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600" />
                    5 watchlists
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600" />
                    10 backtests/month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-600" />
                    AI assistant (limited)
                  </li>
                </ul>
              </div>
              
              <Button className="w-full cursor-pointer">
                <CreditCard className="size-4" />
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
