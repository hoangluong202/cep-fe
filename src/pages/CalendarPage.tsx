import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@states';

import { SchedulerCalendar, SimpleNavbar } from '@components';

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
      <SchedulerCalendar />
    </div>
  );
};
