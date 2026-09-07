import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const data = await User.find().select('-passwordHash').sort({ name: 1 });

    response.json({
      resource: 'users',
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;