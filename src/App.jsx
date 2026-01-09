import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'

function Router() {
  const { user, loading } = useAuth()

  if (loading) return <div className="page-loader">Loading...</div>

  return (
    <ProtectedRoute fallback={<LoginPage />}>
      <DashboardPage />
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
