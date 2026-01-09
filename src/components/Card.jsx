import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <article className={`user-card ${className}`}>
      {children}
    </article>
  )
}
