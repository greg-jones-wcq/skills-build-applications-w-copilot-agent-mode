import { Router } from 'express';
import { Team } from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const data = await Team.find().sort({ name: 1 });

    response.json({
      resource: 'teams',
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;