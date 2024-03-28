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
  }
];
