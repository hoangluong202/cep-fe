import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@states';

import { Clock, Filter, ListCalendar, SchedulerCalendar, SimpleNavbar } from '@components';

export const CalendarPage = () => {
  const navigate = useNavigate();
  const { userStatus } = useUserStore();

  if (userStatus === 'UNINIT' || userStatus === 'PENDING') {
    navigate('/login');
  }
  console.log('In page calendar');

  return (
    <div className='flex flex-col h-full gap-y-2'>
      <SimpleNavbar />
      <Filter />
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
