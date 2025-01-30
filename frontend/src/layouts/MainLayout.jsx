// src/layouts/MainLayout.jsx
import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function MainLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand">
            StudyGroups
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/groups" className="nav-link">
                  Groups
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sessions" className="nav-link">
                  Sessions
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container flex-fill py-4">
        <Outlet />
      </div>

      {/* FOOTER */}
      <footer className="bg-light text-center py-2">
        <small className="text-muted">
          © {new Date().getFullYear()} Virtual Study Group
        </small>
      </footer>
    </div>
  )
}
