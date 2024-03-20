import { useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { AppLayout, AuthLayout } from '@layouts';
import { AuthPage, CalendarPage, ViewMapPage } from '@pages';
import { AppSkeleton } from '@components';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useUserQuery } from '@hooks';
import { toast } from 'react-toastify';

export default function App() {
  const navigate: NavigateFunction = useNavigate();
  const {
    info: { isFetching, isError, isSuccess, refetch }
  } = useUserQuery();
  const { pathname } = useLocation();

  useEffect(() => {
    refetch({ throwOnError: true }).catch((err) => {
      if (err.statusCode !== 401) toast.error(err.message);
    });
  }, [refetch]);

  useEffect(() => {
    if (pathname === '/' && isSuccess) {
      navigate('view-map');
    }
  }),
    [pathname, isSuccess, navigate];

  if (isFetching) {
    return <AppSkeleton />;
  }

  if (isError) {
    return (
      <AuthLayout>
        <AuthPage />
      </AuthLayout>
    );
  }

  if (isSuccess) {
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
}
