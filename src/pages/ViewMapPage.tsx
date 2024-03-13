import { useNavigate } from 'react-router-dom';
import { useSmartPoleStore, useUserStore } from '@states';
import { SimpleNavbar, SimpleMap, Filter } from '@components';
import { useEffect } from 'react';

export function ViewMapPage() {
  const navigate = useNavigate();
  const { userStatus } = useUserStore();
  const { getAllSmartPoles, setAreas } = useSmartPoleStore();

  useEffect(() => {
    getAllSmartPoles();
    setAreas();
  }, []);

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
