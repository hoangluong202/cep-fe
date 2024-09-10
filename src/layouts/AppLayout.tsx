import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppNav, Header } from '@/components';
import { useAuth } from '@/components/common/useAuth';
import { LoginPage } from '@/pages';

export const Layout: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const routeItems = menu;

  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else {
      if (pathname === '/' || pathname === '/login') {
        navigate('/map');
      }
    }
  }, [pathname, isAuth, navigate]);

  const AppLayout = () => {
    return (
      <div className='flex min-h-screen w-full flex-col bg-muted/40 font-cal'>
        <AppNav menu={menu} />
        <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-screen'>
          <Header menu={menu} />
          <main className='w-full h-dvh'>
            <Routes>
              {routeItems.map((item) => {
                return <Route path={item.path} element={item.element} key={item.path} />;
              })}
            </Routes>
          </main>
        </div>
      </div>
    );
  };
  const LoginLayout = () => (
    <div className='h-screen w-screen'>
      <LoginPage />
    </div>
  );

  return isAuth ? <AppLayout /> : <LoginLayout />;
};
