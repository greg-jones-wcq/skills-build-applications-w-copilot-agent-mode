import { useEffect, useState } from 'react'
import { collectionUrl, fetchCollection } from '../api.js'

//   app.use('https://${codespaceName}-8000.app.github.dev/api/workouts', workoutsRouter);
function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('workouts')
      .then((data) => {
        setWorkouts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <h2>Workouts</h2>
        <span className="endpoint-badge">{collectionUrl('workouts')}</span>
      </div>
      {status === 'loading' && <div className="state-box">Loading workouts...</div>}
      {status === 'error' && <div className="state-box">Unable to load workouts.</div>}
      {status === 'ready' && (
        <div className="data-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id ?? workout.title}>
              <h3>{workout.title}</h3>
              <div className="metric-row"><span>Focus</span><strong>{workout.focus}</strong></div>
              <div className="metric-row"><span>Level</span><strong>{workout.level}</strong></div>
              <div className="metric-row"><span>Duration</span><strong>{workout.durationMinutes} min</strong></div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts