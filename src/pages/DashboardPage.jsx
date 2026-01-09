import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { fetchUsers } from '../api/usersApi'
import Header from '../components/Header'
import Card from '../components/Card'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      console.error('[DashboardPage] fetch error', err)
      setError('Failed to load users. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="page-wrapper dashboard-layout">
      <Header title="Dashboard">
        <span>Welcome, {user?.username}</span>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </Header>

      <main className="dashboard-content">
        {loading && <div className="page-loader">Loading users...</div>}

        {error && (
          <div className="error-container">
            <p className="error-msg">{error}</p>
            <button className="btn-secondary" onClick={loadData}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <div className="users-grid">
            {users.map((u) => (
              <Card key={u.id}>
                <img src={u.avatar} alt={u.first_name} className="user-avatar" />
                <h3>{u.first_name} {u.last_name}</h3>
                <p>{u.email}</p>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
