import { useEffect } from 'react';
import { AppLayout, AuthLayout } from '@layouts';
import { AuthPage, CalendarPage, ViewMapPage } from '@pages';
import { AppSkeleton } from '@components';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { emitEvent, useUserQuery } from '@hooks';
import { toast } from 'react-toastify';
import { MAIN_MENU, SUB_MENU } from '@constants';

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
      navigate('map');
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
            name: 'Skeleton',
            element: <AppSkeleton />
          },
          {
            type: 'main-item',
            path: '/map',
            name: MAIN_MENU.map,
            element: <ViewMapPage />
          },
          {
            type: 'main-item',
            path: '/calendar',
            name: MAIN_MENU.calendar,
            element: <CalendarPage />
          },
          {
            type: 'main-item',
            path: '/dashboard',
            name: MAIN_MENU.dashboard,
            element: <></>
          },
          {
            type: 'main-item',
            path: '/inventory',
            name: MAIN_MENU.inventory,
            element: <></>
          },
          {
            type: 'main-item',
            path: '/feed',
            name: MAIN_MENU.feed,
            element: <></>
          },
          {
            type: 'logout-btn',
            name: SUB_MENU.logout,
            onClick: () => emitEvent('logout')
          }
        ]}
      />
    );
  }
}
