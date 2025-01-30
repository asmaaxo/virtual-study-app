// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    subjects_of_interest: ''
  })

  useEffect(() => {
    API.get('/users/profile')
      .then(res => {
        setUser(res.data)
        setFormData({
          name: res.data.name,
          subjects_of_interest: res.data.subjects_of_interest || ''
        })
      })
      .catch(err => console.error(err))
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpdate = () => {
    API.put('/users/profile', formData)
      .then(res => {
        alert('Profile updated!')
        setUser(res.data.user)
        setEditing(false)
      })
      .catch(err => console.error(err))
  }

  if (!user) return <p>Loading profile...</p>

  return (
    <div>
      <h2>Profile</h2>
      {editing ? (
        <>
          <div className="mb-3">
            <label>Name</label>
            <input 
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Subjects of Interest</label>
            <input 
              className="form-control"
              name="subjects_of_interest"
              value={formData.subjects_of_interest}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success" onClick={handleUpdate}>
            Save
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Interests:</strong> {user.subjects_of_interest}</p>
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  )
}
