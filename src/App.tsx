import { useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { AppLayout, AuthLayout } from '@layouts';
import { AuthPage, CalendarPage, ViewMapPage } from '@pages';
import { useUserStore } from '@states';
import { AppSkeleton } from '@components';

export default function App() {
  const { userStatus, getUserData } = useUserStore();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  if (userStatus === 'UNINIT' || userStatus === 'PENDING') {
    return <AppSkeleton />;
  }

  if (userStatus === 'REJECT') {
    return (
      <AuthLayout>
        <AuthPage />
      </AuthLayout>
    );
  }

  return (
    <AppLayout
      menu={[
        {
          type: 'skeleton',
          path: '/',
          element: <AppSkeleton />
        },
        {
          type: 'item',
          icon: <HomeIcon className='h-5 w-5' />,
          path: '/view-map',
          name: 'Google Map',
          element: <ViewMapPage />
        },
        {
          type: 'item',
          icon: <HomeIcon className='h-5 w-5' />,
          path: '/calendar',
          name: 'Calendar',
          element: <CalendarPage />
        }
      ]}
    />
  );
}
