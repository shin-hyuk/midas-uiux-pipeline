/**
 * Mock Subscription/Billing Data
 * 
 * Mock data for subscription management.
 * Reason: midas-billing service is not yet implemented in backend.
 */

export interface Subscription {
  id: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'cancelled' | 'past_due'
  currentPeriodStart: string
  currentPeriodEnd: string
  features: string[]
}

// Mock subscription data
const mockSubscription: Subscription = {
  id: 'sub-1',
  plan: 'free',
  status: 'active',
  currentPeriodStart: new Date().toISOString(),
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  features: [
    'Basic portfolio tracking',
    '5 watchlists',
    '10 backtests/month',
    'AI assistant (limited)',
  ],
}

export const mockSubscriptionService = {
  async getSubscription(): Promise<Subscription> {
    await new Promise(r => setTimeout(r, 200))
    return mockSubscription
  },

  async getPlans(): Promise<Array<{ id: string; name: string; price: number; features: string[] }>> {
    await new Promise(r => setTimeout(r, 200))
    return [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: ['Basic portfolio tracking', '5 watchlists', '10 backtests/month'],
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 29,
        features: ['Unlimited watchlists', 'Unlimited backtests', 'Priority AI', 'Telegram alerts'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99,
        features: ['Everything in Pro', 'API access', 'Custom strategies', 'Dedicated support'],
      },
    ]
  },
}
