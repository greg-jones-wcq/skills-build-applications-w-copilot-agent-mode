import { useEffect, useState } from 'react'
import { collectionUrl, fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('users')
      .then((data) => {
        setUsers(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <h2>Users</h2>
        <span className="endpoint-badge">{collectionUrl('users')}</span>
      </div>
      {status === 'loading' && <div className="state-box">Loading users...</div>}
      {status === 'error' && <div className="state-box">Unable to load users.</div>}
      {status === 'ready' && (
        <div className="data-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id ?? user.email}>
              <h3>{user.name}</h3>
              <div className="metric-row"><span>Email</span><strong>{user.email}</strong></div>
              <div className="metric-row"><span>Role</span><strong>{user.role}</strong></div>
              <div className="metric-row"><span>Goal</span><strong>{user.profile?.fitnessGoal}</strong></div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users