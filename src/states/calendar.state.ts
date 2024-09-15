import { create } from 'zustand';

export const useCalendarStore = create<CalendarStore>()((set) => ({
  events: [],
  event: {
    visibleCreate: false,
    visibleView: false,
    clickX: 0,
    clickY: 0,
    data: null
  },
  setEvents: (events) => set({ events }),
  setEvent: ({ visibleCreate, visibleView, clickX, clickY, data }) =>
    set({ event: { visibleCreate, visibleView, clickX, clickY, data } })
}));
