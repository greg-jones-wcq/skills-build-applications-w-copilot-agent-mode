import { useEffect, useState } from 'react'
import { collectionUrl, fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('teams')
      .then((data) => {
        setTeams(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <h2>Teams</h2>
        <span className="endpoint-badge">{collectionUrl('teams')}</span>
      </div>
      {status === 'loading' && <div className="state-box">Loading teams...</div>}
      {status === 'error' && <div className="state-box">Unable to load teams.</div>}
      {status === 'ready' && (
        <div className="data-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id ?? team.slug}>
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <div className="metric-row"><span>Coach</span><strong>{team.coachEmail}</strong></div>
              <div className="metric-row"><span>Members</span><strong>{team.memberEmails?.length ?? 0}</strong></div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams