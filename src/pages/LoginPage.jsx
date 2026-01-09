import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      console.log('[LoginPage] submitting', { username })
      const ok = await login(username, password)
      console.log('[LoginPage] login returned', ok)
    } catch (err) {
      console.error('[LoginPage] login error', err)
      // Show a user-friendly error message for wrong credentials
      setError('Invalid username or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper centered">
      <div className="login-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Email / Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (error) setError('')
              }}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError('')
              }}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? <span className="spinner"></span> : 'Sign In'}
          </button>
        </form>
        <p className="hint">Demo: Use "test" or "admin" for both fields</p>
      </div>
    </div>
  )
}
