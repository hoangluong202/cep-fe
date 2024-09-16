import { create } from 'zustand';

export const useCalendarStore = create<CalendarStore>()((set) => ({
  events: [
    {
      id: '1',
      resourceId: 'a3',
      title: 'Lễ khai giảng',
      start: '2024-09-16T00:00:00',
      allDay: true,
      end: '2024-09-17T00:00:00',
      templateId: '1'
    }
  ],
  eventView: {
    visible: false,
    clickX: 0,
    clickY: 0,
    data: null
  },
  eventCreate: {
    visible: false,
    clickX: 0,
    clickY: 0,
    data: null
  },
  setEvents: (events) => set({ events }),
  setEventView: ({ visible, clickX, clickY, data }) =>
    set({ eventView: { visible, clickX, clickY, data } }),
  resetEventView: () => set({ eventView: { visible: false, clickX: 0, clickY: 0, data: null } }),
  setEventCreate: ({ visible, clickX, clickY, data }) =>
    set({ eventCreate: { visible, clickX, clickY, data } }),
  resetEventCreate: () => set({ eventCreate: { visible: false, clickX: 0, clickY: 0, data: null } })
}));
