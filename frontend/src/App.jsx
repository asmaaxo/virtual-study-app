// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import GroupsPage from './pages/GroupsPage'
import GroupDetailPage from './pages/GroupDetailPage'
import SessionsPage from './pages/SessionsPage'
import NotFoundPage from './pages/NotFoundPage'

import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './layouts/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      {/* Public route for login/register */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected routes: user must have token to access */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
      </Route>

      {/* Catch-all 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
