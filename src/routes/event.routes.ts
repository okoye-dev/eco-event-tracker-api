import { Router } from 'express';
import { createEvent, getEventDetails } from '../controllers/event.controller';

const router = Router();

router.post('/events', createEvent);
router.get('/events/:eventId', getEventDetails);

export default router;
