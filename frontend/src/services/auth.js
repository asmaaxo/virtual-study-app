// src/services/auth.js
import API from './api'

export const registerUser = async (userData) => {
  const res = await API.post('/auth/register', userData)
  return res.data
}

export const loginUser = async (credentials) => {
  const res = await API.post('/auth/login', credentials)
  if (res.data.access_token) {
    localStorage.setItem('token', res.data.access_token)
  }
  return res.data
}
