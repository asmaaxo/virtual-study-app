// src/services/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: 'https://virtual-study-app.onrender.com/api' // Adjust to your backend
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
