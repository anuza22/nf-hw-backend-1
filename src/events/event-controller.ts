import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';
import AuthService from '../auth/auth-service';

class EventController {
    private eventService : EventService;
    private authService: AuthService;  


    constructor(eventService: EventService, authService: AuthService) {
      this.eventService = eventService;
      this.authService = authService;  
  }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
          const createEventDto: CreateEventDto = req.body;
          const event = await this.eventService.createEvent(createEventDto);
          res.status(201).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }



      getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const sortBy = req.query.sortBy as string || 'rating';
            const sortDirection = req.query.sortDirection as string || 'desc';

            const user = (req as any).user;
            const city = user.city;

            const events = await this.eventService.getEventsByCity(city, page, limit, sortBy, sortDirection);
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    


    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
          const event = await this.eventService.getEventById(id);
          if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
          }
          res.status(200).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }

      getEventsByCity = async (req: Request, res: Response): Promise<void> => {
        try {
            const { city } = req.params;
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            const sortBy = req.query.sortBy as string || 'rating';
            const sortDirection = req.query.sortDirection as string || 'desc';

            const events = await this.eventService.getEventsByCity(city, page, limit, sortBy, sortDirection);
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default EventController;