import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const data = await Leaderboard.find().sort({ rank: 1 });

    response.json({
      resource: 'leaderboard',
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;