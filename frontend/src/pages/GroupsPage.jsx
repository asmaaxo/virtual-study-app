// src/pages/GroupsPage.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function GroupsPage() {
  const [groups, setGroups] = useState([])
  const [newGroup, setNewGroup] = useState({ name: '', subject: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Fetch the user’s existing groups from GET /api/groups/my-groups
  const fetchGroups = () => {
    API.get('/groups/my-groups')
      .then(res => {
        setGroups(res.data)
        setError('')
      })
      .catch(err => {
        console.error('Failed to fetch groups:', err)
        const message = err.response?.data?.message || 'Failed to fetch groups.'
        setError(message)
      })
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  // Create a new group with POST /api/groups/
  const handleCreateGroup = async (e) => {
    e.preventDefault()
    const { name, subject } = newGroup

    // Validate inputs
    if (!name.trim() || !subject.trim()) {
      setError('Please enter both group name and subject.')
      return
    }

    // Ensure subject is a string
    const subjectStr = String(subject).trim()

    // Log the data being sent for debugging
    console.log('Creating group with:', { name: name.trim(), subject: subjectStr })

    try {
      const res = await API.post('/groups/', { name: name.trim(), subject: subjectStr })
      alert(res.data.message || 'Group created successfully.')
      fetchGroups()
      setNewGroup({ name: '', subject: '' })
      setError('')
    } catch (err) {
      console.error('Error creating group:', err)
      const message = err.response?.data?.message || 'Failed to create group.'
      setError(message)
    }
  }

  return (
    <div>
      <h2 className="mb-4">My Groups</h2>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* List existing groups */}
      {groups.length === 0 ? (
        <p>You have no groups yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {groups.map(g => (
            <div key={g.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{g.name}</h5>
                  <p className="card-text"><strong>Subject:</strong> {g.subject}</p>
                </div>
                <div className="card-footer text-end">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate(`/groups/${g.id}`)}
                  >
                    View Details <i className="bi bi-arrow-right-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="my-5" />

      <h4 className="mb-3">Create New Group</h4>
      <form onSubmit={handleCreateGroup}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Group Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter group name"
              value={newGroup.name}
              onChange={e => setNewGroup({ ...newGroup, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter subject"
              value={newGroup.subject}
              onChange={e => setNewGroup({ ...newGroup, subject: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Create Group <i className="bi bi-plus-circle-fill"></i>
        </button>
      </form>
    </div>
  )
}
