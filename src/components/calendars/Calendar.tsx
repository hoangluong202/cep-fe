import { useCallback, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addDays, startOfDay, subDays } from 'date-fns';
import { MyEvent } from 'src/types/event';

export const SchedulerCalendar: Component = () => {
  const [events, setEvents] = useState<MyEvent[]>(myEvents);

  const handleSelectEvent = useCallback((event: MyEvent) => window.alert(event.title), []);

  const handleSelectSlot = useCallback(
    ({ start, end }: MyEvent) => {
      const title = window.prompt('New Event name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  return (
    <Calendar
      dayLayoutAlgorithm={'no-overlap'}
      defaultView={Views.MONTH}
      events={events.sort((a, b) => (a.priority && b.priority ? b.priority - a.priority : 0))}
      localizer={localizer}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      selectable={true}
      popup={true}
      // showMultiDayTimes
      eventPropGetter={(event) => {
        return {
          style: {
            backgroundColor: event.color,
            color: 'black'
          }
        };
      }}
    />
  );
};

const locales = {
  'en-US': enUS
};
const now = startOfDay(new Date());
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const myEvents = [
  {
    id: '1',
    title: 'Lịch mặc định',
    start: subDays(now, 24),
    end: addDays(now, 1),
    color: 'rgb(34 211 238)',
    priority: 0
  },
  {
    id: '1.1',
    title: 'Lịch mặc định',
    start: addDays(now, 7),
    end: addDays(now, 18),
    color: 'rgb(34 211 238)',
    priority: 0
  },
  {
    id: '2',
    title: 'Lịch nghỉ tết',
    start: addDays(now, 1),
    end: addDays(now, 3),
    color: 'rgb(74 222 128)',
    priority: 1
  },
  {
    id: '3',
    title: 'Lịch chạy bộ',
    start: addDays(now, 3),
    end: addDays(now, 4),
    color: 'rgb(253 224 71)',
    priority: 2
  },
  {
    id: '4',
    title: 'Lịch đón quan khách',
    start: addDays(now, 4),
    end: addDays(now, 5),
    color: 'rgb(249 115 22)',
    priority: 2
  },
  {
    id: '5',
    title: 'Lịch Halloween',
    start: addDays(now, 5),
    end: addDays(now, 6),
    color: 'rgb(52 211 153)',
    priority: 1
  },
  {
    id: '6',
    title: 'Lịch giờ Trái Đất',
    start: addDays(now, 6),
    end: addDays(now, 7),
    color: 'rgb(190 18 60)',
    priority: 1
  }
];
