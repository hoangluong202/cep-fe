import { invoke, server } from './common';

export const calendarService = {
  getAll: () => invoke<MyCalendar[]>(server.get('api/calendars')),
  get: (id: number) => invoke<MyCalendar>(server.get(`api/calendars/${id}`)),
  create: (calendar: CreateCalendarFormData) => invoke(server.post('api/calendars', calendar))
};
