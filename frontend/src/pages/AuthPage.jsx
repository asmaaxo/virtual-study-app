// src/pages/AuthPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/auth'

export default function AuthPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subjects_of_interest: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        // LOGIN
        const res = await loginUser({
          email: formData.email,
          password: formData.password
        })
        alert(`Welcome, ${res.user?.name || 'User'}!`)
        navigate('/dashboard')
      } else {
        // REGISTER
        if (!formData.name || !formData.email || !formData.password) {
          alert('Fill in all required fields')
          return
        }
        const res = await registerUser(formData)
        alert(res.message)
        setIsLogin(true)
      }
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <div className="border p-4 bg-white" style={{ width: '350px' }}>
        <h2 className="text-center mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Subjects of Interest</label>
                <input
                  type="text"
                  name="subjects_of_interest"
                  className="form-control"
                  value={formData.subjects_of_interest}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-3">
          <button 
            className="btn btn-link" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Create an account' : 'Already have an account?'}
          </button>
        </div>
      </div>
    </div>
  )
}
