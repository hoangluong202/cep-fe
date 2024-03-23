import { Clock, ListCalendar, ListFilter, SchedulerCalendar } from '@components';

export const CalendarPage = () => {
  console.log('In page calendar');

  return (
    <div className='flex flex-col h-full gap-y-2'>
      <ListFilter />
      <div className='flex flex-row items-stretch'>
        <div className='flex flex-col gap-y-2'>
          <Clock />
          <ListCalendar />
        </div>
        <SchedulerCalendar />
      </div>
    </div>
  );
};
