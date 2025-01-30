// src/pages/SessionsPage.jsx
import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function SessionsPage() {
  const [myGroups, setMyGroups] = useState([])
  const [sessions, setSessions] = useState([])
  const [formData, setFormData] = useState({
    group_id: '',
    session_name: '',
    scheduled_time: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch user’s groups to populate the dropdown
    API.get('/groups/my-groups')
      .then(res => {
        setMyGroups(res.data)
        setError('')
      })
      .catch(err => {
        console.error('Failed to fetch groups:', err)
        setError('Failed to fetch groups.')
      })
  }, [])

  // Fetch sessions for the selected group
  const handleFetchSessions = async () => {
    const { group_id } = formData
    if (!group_id) {
      setError('Please select a group to fetch sessions.')
      return
    }

    try {
      const res = await API.get(`/sessions/group/${group_id}`)
      setSessions(res.data)
      setError('')
    } catch (err) {
      console.error('Failed to fetch sessions:', err)
      const message = err.response?.data?.message || 'Failed to fetch sessions.'
      setError(message)
    }
  }

  // Schedule a new session
  const handleSchedule = async (e) => {
    e.preventDefault()
    const { group_id, session_name, scheduled_time } = formData

    // Validate inputs
    if (!group_id || !session_name.trim() || !scheduled_time) {
      setError('All fields are required.')
      return
    }

    // Ensure group_id is a number
    const groupIdNum = Number(group_id)
    if (isNaN(groupIdNum)) {
      setError('Invalid group selected.')
      return
    }

    // Log the data being sent for debugging
    console.log('Scheduling session with:', { group_id: groupIdNum, session_name, scheduled_time })

    try {
      const res = await API.post('/sessions/', { 
        group_id: groupIdNum, 
        session_name: session_name.trim(), 
        scheduled_time 
      })
      alert(res.data.message || 'Session scheduled successfully.')
      // Refresh sessions list
      handleFetchSessions()
      // Clear form
      setFormData({ group_id: '', session_name: '', scheduled_time: '' })
      setError('')
    } catch (err) {
      console.error('Error scheduling session:', err)
      const message = err.response?.data?.message || 'Failed to schedule session.'
      setError(message)
    }
  }

  return (
    <div>
      <h2 className="mb-4">Study Sessions</h2>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Schedule Session Form */}
      <form onSubmit={handleSchedule} className="mb-5">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Select Group</label>
            <select
              className="form-select"
              value={formData.group_id}
              onChange={e => setFormData({ ...formData, group_id: e.target.value })}
              required
            >
              <option value="">-- Select Group --</option>
              {myGroups.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Session Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter session name"
              value={formData.session_name}
              onChange={e => setFormData({ ...formData, session_name: e.target.value })}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Scheduled Time</label>
            {/* Use type="datetime-local" to get ISO-like string */}
            <input
              type="datetime-local"
              className="form-control"
              value={formData.scheduled_time}
              onChange={e => setFormData({ ...formData, scheduled_time: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3 me-2">
          Schedule Session
        </button>
        <button type="button" className="btn btn-success mt-3" onClick={handleFetchSessions}>
          Fetch Sessions
        </button>
      </form>

      {/* Display Sessions */}
      <h4 className="mb-3">Upcoming Sessions</h4>
      {sessions.length === 0 ? (
        <p>No sessions found for the selected group.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {sessions.map(s => (
            <div key={s.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{s.session_name}</h5>
                  <p className="card-text"><strong>Scheduled Time:</strong> {new Date(s.scheduled_time).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
