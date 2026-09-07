import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const data = await Activity.find().sort({ loggedAt: -1 });

    response.json({
      resource: 'activities',
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;