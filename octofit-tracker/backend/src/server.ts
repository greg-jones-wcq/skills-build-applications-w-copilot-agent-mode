import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.use('https://${codespaceName}-8000.app.github.dev/api/users', usersRouter);
app.use('https://${codespaceName}-8000.app.github.dev/api/teams', teamsRouter);
app.use('https://${codespaceName}-8000.app.github.dev/api/activities', activitiesRouter);
app.use('https://${codespaceName}-8000.app.github.dev/api/leaderboard', leaderboardRouter);
app.use('https://${codespaceName}-8000.app.github.dev/api/workouts', workoutsRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    database: 'octofit_db',
  });
});

app.get('/api', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    version: '0.1.0',
    endpoints: [
      '/api/health',
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});