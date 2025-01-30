// src/pages/NotFoundPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center mt-5">
      <h2>404 - Page Not Found</h2>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </div>
  )
}
