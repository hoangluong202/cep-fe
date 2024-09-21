import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppNav } from '@/components';
import { useAuth } from '@/components/common/useAuth';

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
      } else {
        navigate(pathname);
      }
    }
  }, [pathname, isAuth, navigate]);

  const AppLayout = () => {
    return (
      <div className='min-h-screen w-full bg-muted/40 font-cal'>
        <AppNav menu={menu} />
        <main className='w-dvh pl-12'>
          <Routes>
            {routeItems.map((item) => {
              if (item.type !== 'auth-item')
                return <Route path={item.path} element={item.element} key={item.path} />;
            })}
          </Routes>
        </main>
      </div>
    );
  };
  const LoginLayout = () => (
    <div className='h-screen w-screen'>
      <Routes>
        {routeItems.map((item) => {
          if (item.type === 'auth-item')
            return <Route path={item.path} element={item.element} key={item.path} />;
        })}
      </Routes>
    </div>
  );

  return isAuth ? <AppLayout /> : <LoginLayout />;
};
