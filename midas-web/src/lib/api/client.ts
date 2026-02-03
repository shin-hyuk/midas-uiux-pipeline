/**
 * API Client
 * 
 * HTTP client with JWT token handling for all backend API calls.
 * Handles authentication headers, error responses, and token refresh.
 */

import { API_CONFIG } from './config'

interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

class ApiClient {
  private baseUrl: string
  private timeout: number

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
    this.timeout = API_CONFIG.timeout
  }

  // Get stored JWT token
  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('midas_token')
  }

  // Store JWT token
  setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('midas_token', token)
  }

  // Remove JWT token
  clearToken(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('midas_token')
  }

  // Build headers with auth
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  // Generic request method
  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle 401 - clear token and throw
      if (response.status === 401) {
        this.clearToken()
        throw new Error('Unauthorized - please log in again')
      }

      // Parse response
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.message || data?.error || `Request failed: ${response.status}`)
      }

      return data as T
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout')
        }
        throw error
      }
      
      throw new Error('Network error')
    }
  }

  // HTTP methods
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint)
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', endpoint, body)
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', endpoint, body)
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', endpoint, body)
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint)
  }

  // Login method (special handling to store token)
  async login(credentials: { login: string; password: string }): Promise<{
    token: string
    user: unknown
  }> {
    const response = await this.post<{ token: string; user: unknown }>(
      '/api/v1/auth/login',
      credentials
    )
    
    if (response.token) {
      this.setToken(response.token)
    }
    
    return response
  }

  // Logout
  logout(): void {
    this.clearToken()
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
