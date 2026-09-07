const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

//   app.use('https://${codespaceName}-8000.app.github.dev/api/users', usersRouter);
//   app.use('https://${codespaceName}-8000.app.github.dev/api/teams', teamsRouter);
//   app.use('https://${codespaceName}-8000.app.github.dev/api/activities', activitiesRouter);
//   app.use('https://${codespaceName}-8000.app.github.dev/api/leaderboard', leaderboardRouter);
//   app.use('https://${codespaceName}-8000.app.github.dev/api/workouts', workoutsRouter);
  
export function collectionUrl(collection) {
  return `${apiBaseUrl}/${collection}/`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  return []
}

export async function fetchCollection(collection) {
  const response = await fetch(collectionUrl(collection))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}