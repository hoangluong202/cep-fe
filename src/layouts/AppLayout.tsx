import { Route, Routes, useLocation } from 'react-router-dom';
import { MENU_BAR_NAME } from '@constants';
import { useMenuBarStore } from '@states';
import { useEffect } from 'react';
import { LoginPage } from '@/pages';
import { AppNav } from '@/components';
import { Header } from '@/components/common/Header';

export const AppLayout: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const { pathname } = useLocation();
  const { setSelectedMenu } = useMenuBarStore();
  const routeItems = menu;

  useEffect(() => {
    if (pathname === '/login' || pathname === '/') {
      setSelectedMenu('Login');
    }
    if (pathname === '/dashboard') {
      setSelectedMenu(MENU_BAR_NAME.dashboard);
    }
    if (pathname === '/map') {
      setSelectedMenu(MENU_BAR_NAME.map);
    }
    if (pathname === '/calendar') {
      setSelectedMenu(MENU_BAR_NAME.calendar);
    }
  }, [pathname, setSelectedMenu]);

  if (!localStorage.getItem('authToken')) {
    return <LoginPage />;
  } else
    return (
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
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
