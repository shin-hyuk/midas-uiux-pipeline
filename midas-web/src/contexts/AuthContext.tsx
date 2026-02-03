'use client'

/**
 * Authentication Context
 * 
 * Manages user authentication state, JWT tokens, and user data.
 * Used across the app for protected routes and user info display.
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { apiClient } from '@/lib/api'
import type { User, LoginRequest, RegisterRequest } from '@/lib/api'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (apiClient.isAuthenticated()) {
        try {
          // Fetch current user data
          const userData = await apiClient.get<User>('/api/v1/users/me')
          setUser(userData)
        } catch {
          // Token invalid, clear it
          apiClient.clearToken()
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await apiClient.login(credentials)
    setUser(response.user as User)
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    // Register and auto-login
    const response = await apiClient.post<{ token: string; user: User }>(
      '/api/v1/auth/register',
      data
    )
    
    if (response.token) {
      apiClient.setToken(response.token)
      setUser(response.user)
    }
  }, [])

  const logout = useCallback(() => {
    apiClient.logout()
    setUser(null)
  }, [])

  // PRD: US-75 - Update user (including avatar selection)
  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
