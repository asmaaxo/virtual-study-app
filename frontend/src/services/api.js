// src/services/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api' // Adjust if your backend differs
})

// Interceptor to attach token for each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
