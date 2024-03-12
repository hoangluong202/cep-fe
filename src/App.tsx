import { useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { AppLayout, AuthLayout } from '@layouts';
import { AuthPage, HomePage } from '@pages';
import { useUserStore } from '@states';
import { AppSkeleton } from '@components';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function App() {
  const navigate: NavigateFunction = useNavigate();
  const { userStatus, getUserData } = useUserStore();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (userStatus === 'SUCCESS') {
      navigate('/view-map');
    }
  }, [userStatus, navigate]);

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
          element: <HomePage />
        }
      ]}
    />
  );
}
