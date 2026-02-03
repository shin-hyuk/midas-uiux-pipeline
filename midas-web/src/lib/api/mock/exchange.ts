/**
 * Mock Exchange Data
 * 
 * Mock data for exchange connections.
 * Reason: midas-exchange service is not yet implemented in backend.
 */

export interface ExchangeConnection {
  id: string
  name: string
  type: 'binance' | 'coinbase' | 'kraken' | 'interactive_brokers'
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
}

// Mock data for development
const mockExchanges: ExchangeConnection[] = [
  {
    id: 'exc-1',
    name: 'Binance',
    type: 'binance',
    status: 'connected',
    lastSync: new Date().toISOString(),
  },
  {
    id: 'exc-2',
    name: 'Coinbase',
    type: 'coinbase',
    status: 'disconnected',
  },
]

export const mockExchangeService = {
  async getConnections(): Promise<ExchangeConnection[]> {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 300))
    return mockExchanges
  },

  async connect(type: ExchangeConnection['type']): Promise<ExchangeConnection> {
    await new Promise(r => setTimeout(r, 500))
    return {
      id: `exc-${Date.now()}`,
      name: type.charAt(0).toUpperCase() + type.slice(1),
      type,
      status: 'connected',
      lastSync: new Date().toISOString(),
    }
  },

  async disconnect(id: string): Promise<void> {
    await new Promise(r => setTimeout(r, 300))
  },
}
