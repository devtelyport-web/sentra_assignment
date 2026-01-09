import React from 'react'
import { useAuth } from '../contexts/AuthContext'

/**
 * A simple wrapper to protect routes.
 * In a real app with react-router, this would use <Navigate />.
 * Here it just returns children if authenticated, otherwise null (App.jsx handles the switch).
 */
export default function ProtectedRoute({ children, fallback }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="page-loader">Loading...</div>
  }

  if (!user) {
    return fallback || null
  }

  return children
}
