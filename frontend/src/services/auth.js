// src/services/auth.js
import API from './api'

export const loginUser = async (credentials) => {
  // Expects { email, password }
  const res = await API.post('/auth/login', credentials)
  if (res.data.access_token) {
    // Store token
    localStorage.setItem('token', res.data.access_token)
  }
  return res.data
}

export const registerUser = async (userData) => {
  // userData might include name, email, password, subjects_of_interest
  const res = await API.post('/auth/register', userData)
  return res.data
}
