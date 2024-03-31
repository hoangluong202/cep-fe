import { ListCalendar, FilterSmartPole, SchedulerCalendar, SchedulerForm } from '@components';

export const CalendarPage = () => {
  return (
    <div className='flex flex-row gap-x-2 h-full'>
      <div className='w-1/5'>
        <ListCalendar />
      </div>
      <div className='w-4/5 flex flex-col gap-y-2'>
        <div className='flex flex-row-reverse gap-x-5'>
          <FilterSmartPole />
          <SchedulerForm />
        </div>
        {<SchedulerCalendar />}
      </div>
    </div>
  );
};
