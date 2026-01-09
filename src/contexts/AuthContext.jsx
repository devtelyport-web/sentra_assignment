import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    console.log('[AuthProvider] init: token=', stored, 'user=', storedUser)
    if (stored && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    console.log('[AuthProvider] login called with', { username })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Normalize input
      const usernameClean = (username || '').trim().toLowerCase()
      const passwordClean = (password || '').trim()
      console.log('[AuthProvider] checking credentials', { usernameClean, passwordClean })

      // Mock credentials: any combination of test/admin for both fields
      const allowed = ['test', 'admin']

      if (!allowed.includes(usernameClean) || !allowed.includes(passwordClean)) {
        throw new Error('Invalid username or password')
      }

      // Generate a mock token
      const token = 'mock_token_' + Math.random().toString(36).slice(2)
      const userData = { username: usernameClean, token }

      console.log('[AuthProvider] login success, user=', userData)
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      setUser(userData)
      return true
    } catch (err) {
      console.error('[AuthProvider] login error', err)
      throw new Error(err.message || 'Login error')
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
