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
import { Event } from 'react-big-calendar';

export const SchedulerCalendar: Component = () => {
  const [events, setEvents] = useState<Event[]>(myEvents);

  const handleSelectEvent = useCallback((event: Event) => window.alert(event.title), []);

  const handleSelectSlot = useCallback(
    ({ start, end }: Event) => {
      const title = window.prompt('New Event name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title, color: '#219744' }]);
      }
    },
    [setEvents]
  );

  return (
    <Calendar
      dayLayoutAlgorithm={'no-overlap'}
      defaultView={Views.MONTH}
      events={events}
      localizer={localizer}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      selectable={true}
      popup={true}
      eventPropGetter={(e) => {
        return {
          style: {
            backgroundColor: e.resource?.color,
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
//event repeat of Event type

const myEvents: Event[] = [
  {
    title: 'Lịch mặc định',
    start: subDays(now, 33),
    end: subDays(now, 23),
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  },
  {
    title: 'Lịch giờ Trái Đất',
    start: subDays(now, 23),
    end: subDays(now, 20),
    allDay: true,
    resource: {
      id: '1',
      color: '#dc0909'
    }
  },
  {
    title: 'Lịch mặc định',
    start: subDays(now, 20),
    end: subDays(now, 10),
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  },
  {
    title: 'Lịch chạy bộ Runner',
    start: subDays(now, 10),
    end: subDays(now, 9),
    allDay: true,
    resource: {
      id: '3',
      color: '#dac225'
    }
  },
  {
    title: 'Lịch mặc định',
    start: subDays(now, 9),
    end: now,
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  },
  {
    title: 'Lịch dành đón quan khách',
    start: now,
    end: addDays(now, 2),
    allDay: true,
    resource: {
      id: '4',
      color: '#151aa8'
    }
  },
  {
    title: 'Lịch mặc định',
    start: addDays(now, 2),
    end: addDays(now, 10),
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  }
];
