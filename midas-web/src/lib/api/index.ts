/**
 * API Module Index
 * 
 * Usage:
 * - Use services/* for REAL backend API calls
 * - Use mock/* ONLY for features without backend
 * - Check config.ts MOCK_SERVICES before using mock data
 */

// Core
export { apiClient } from './client'
export { API_CONFIG, API_ENDPOINTS, MOCK_SERVICES } from './config'

// Types
export * from './types'

// Real API Services
export * from './services'

// Mock Services (only for missing backends)
export * from './mock'
