// src/layouts/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  // If no token, user is not logged in → go to Auth
  if (!token) {
    return <Navigate to="/" replace />
  }
  // Otherwise, render the nested layout/pages
  return children
}
