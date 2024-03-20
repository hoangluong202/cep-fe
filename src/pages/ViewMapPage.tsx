// import { useNavigate } from 'react-router-dom';
import { useSmartPoleStore } from '@states';
import { NavigationBar, SimpleMap, Filter } from '@components';
import { useEffect } from 'react';

export function ViewMapPage() {
  // const navigate = useNavigate();
  // const { userStatus } = useUserStore();
  const { getAllSmartPoles, getAllAreas } = useSmartPoleStore();
  console.log('In page view map');

  useEffect(() => {
    getAllSmartPoles();
    getAllAreas();
  }, []);

  // if (userStatus === 'UNINIT' || userStatus === 'PENDING') {
  //   navigate('/login');
  // }

  return (
    <div className='flex flex-col h-full gap-y-2'>
      <NavigationBar />
      <Filter />
      <SimpleMap />
    </div>
  );
}
