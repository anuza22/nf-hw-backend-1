import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, {IEvent} from './models/Event';
import Event from './models/Event';
import { Response, Request } from 'express';


// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
  
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async getEvents(page: number, limit: number, sortBy: string, sortDirection: string): Promise<IEvent[]> {
      try {
          const skip = (page - 1) * limit;
          const sort: { [key: string]: 1 | -1 } = { [sortBy]: sortDirection === 'desc' ? -1 : 1 };          return await EventModel.find().skip(skip).limit(limit).sort(sort).exec();
      } catch (error) {
          console.error('Error getting events:', error);
          throw new Error('Failed to get events');
      }
  }

  async getEventsByCity(city: string, page: number, limit: number, sortBy: string, sortDirection: string): Promise<IEvent[]> {
    try {
        const skip = (page - 1) * limit;
        const sort: { [key: string]: 1 | -1 } = { [sortBy]: sortDirection === 'desc' ? -1 : 1 };        return await EventModel.find({ city }).skip(skip).limit(limit).sort(sort).exec();
    } catch (error) {
        console.error('Error getting events by city:', error);
        throw new Error('Failed to get events by city');
    }
}

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, date, location ,duration, city} = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date: new Date(date),
        city,
        location,
        duration
      });
  
      await newEvent.save();
      return newEvent;
    }
  
    
  }
  
  export default EventService;
  