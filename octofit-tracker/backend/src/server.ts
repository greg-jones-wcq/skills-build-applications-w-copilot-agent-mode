import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

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
    endpoints: ['/api/health'],
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});