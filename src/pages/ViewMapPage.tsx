import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@states';
import { SimpleNavbar, SimpleMap, Filter } from '@components';

export function ViewMapPage() {
  const navigate = useNavigate();
  const { userStatus } = useUserStore();

  if (userStatus === 'UNINIT' || userStatus === 'PENDING') {
    navigate('/login');
  }

  return (
    <div className='flex flex-col h-full gap-y-2'>
      <SimpleNavbar />
      <Filter />
      <SimpleMap />
    </div>
  );
}
