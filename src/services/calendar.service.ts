import { invoke, server } from './common';

export const calendarService = {
  getAll: () => invoke<MyCalendar[]>(server.get('api/calendars')),
  create: (calendar: MyCalendarPayload) => invoke(server.post('api/calendars', calendar))
};
