import { invoke, server } from './common';

export const calendarService = {
  getAll: () => invoke<MyCalendar[]>(server.get('api/calendars')),
  create: (calendar: CreateCalendarFormData) => invoke(server.post('api/calendars', calendar))
};
