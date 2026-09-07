import { useEffect, useState } from 'react'
import { collectionUrl, fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('activities')
      .then((data) => {
        setActivities(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <h2>Activities</h2>
        <span className="endpoint-badge">{collectionUrl('activities')}</span>
      </div>
      {status === 'loading' && <div className="state-box">Loading activities...</div>}
      {status === 'error' && <div className="state-box">Unable to load activities.</div>}
      {status === 'ready' && (
        <div className="data-grid">
          {activities.map((activity) => (
            <article className="data-card" key={activity._id ?? `${activity.userEmail}-${activity.loggedAt}`}>
              <h3>{activity.type}</h3>
              <div className="metric-row"><span>Athlete</span><strong>{activity.userEmail}</strong></div>
              <div className="metric-row"><span>Duration</span><strong>{activity.durationMinutes} min</strong></div>
              <div className="metric-row"><span>Calories</span><strong>{activity.caloriesBurned}</strong></div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities