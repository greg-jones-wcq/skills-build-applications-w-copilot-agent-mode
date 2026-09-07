import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const data = await Workout.find().sort({ level: 1, title: 1 });

    response.json({
      resource: 'workouts',
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;