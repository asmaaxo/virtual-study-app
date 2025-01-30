// src/pages/GroupDetailPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'

export default function GroupDetailPage() {
  const { groupId } = useParams()
  const [group, setGroup] = useState(null)

  useEffect(() => {
    API.get(`/groups/my-groups`)
      .then(res => {
        // find the group with ID == groupId
        const found = res.data.find(g => g.id === Number(groupId))
        setGroup(found)
      })
      .catch(err => console.error(err))
  }, [groupId])

  if (!group) return <p>Loading Group #{groupId}...</p>

  return (
    <div>
      <h2>Group Detail</h2>
      <p><strong>Group ID:</strong> {group.id}</p>
      <p><strong>Name:</strong> {group.name}</p>
      <p><strong>Subject:</strong> {group.subject}</p>
      {/* Add more advanced logic (resources, discussion, etc.) as needed */}
    </div>
  )
}
