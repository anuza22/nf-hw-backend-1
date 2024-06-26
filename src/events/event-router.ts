import { Router } from 'express';
import EventController from './event-controller';
import EventService from './event-service';
import AuthService from '../auth/auth-service';
import { authMiddleware } from '../middlewares/auth-middleware';

//in order to provide our frontend with the user data, we need to specify user routes

const eventRouter = Router();

const eventService = new EventService();
const authService = new AuthService();
const eventController = new EventController(eventService, authService);

eventRouter.get('/events/', authMiddleware, eventController.getEvents);
eventRouter.post('/events/', authMiddleware, eventController.createEvent);
eventRouter.get('/events/:id', authMiddleware, eventController.getEventById);
eventRouter.get('/events/city/:city', authMiddleware, eventController.getEventsByCity);

export default eventRouter;
