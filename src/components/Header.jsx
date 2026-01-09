import React from 'react'

export default function Header({ title, children }) {
  return (
    <header className="dashboard-header">
      <h1>{title}</h1>
      <div className="header-info">
        {children}
      </div>
    </header>
  )
}
