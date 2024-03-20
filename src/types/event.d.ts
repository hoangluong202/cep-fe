import { Event } from 'react-big-calendar';

type MyEvent = Event & {
  id?: string;
  color?: string;
  priority?: number;
};

type EventPayload = Omit<MyEvent, 'id'>;
type EventStore = {
  eventStatus: StoreStatus;
  events: MyEvent[];
  eventSelectedById: MyEvent;
  getAllEvents: () => Promise<void>;
  getEventById: (id: string) => Promise<void>;
  createEvent: (payload: EventPayload) => Promise<void>;
  updateEvent: (id: string, payload: EventPayload) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
};
