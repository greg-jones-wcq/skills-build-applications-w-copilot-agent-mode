import { useEffect, useState } from 'react'
import { collectionUrl, fetchCollection } from '../api.js'

//   app.use('https://${codespaceName}-8000.app.github.dev/api/leaderboard', leaderboardRouter);
function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('leaderboard')
      .then((data) => {
        setLeaders(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <h2>Leaderboard</h2>
        <span className="endpoint-badge">{collectionUrl('leaderboard')}</span>
      </div>
      {status === 'loading' && <div className="state-box">Loading leaderboard...</div>}
      {status === 'error' && <div className="state-box">Unable to load leaderboard.</div>}
      {status === 'ready' && (
        <div className="data-grid">
          {leaders.map((leader) => (
            <article className="data-card" key={leader._id ?? leader.userEmail}>
              <h3>#{leader.rank} {leader.displayName}</h3>
              <div className="metric-row"><span>Team</span><strong>{leader.teamSlug}</strong></div>
              <div className="metric-row"><span>Weekly points</span><strong>{leader.weeklyPoints}</strong></div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard