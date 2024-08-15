import { Route, Routes, useLocation } from 'react-router-dom';
import { MENU_BAR } from '@constants';
import { useMenuBarStore } from '@states';
import { useEffect } from 'react';

export const AppLayout: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const { pathname } = useLocation();
  const { setSelectedMenu } = useMenuBarStore();
  const routeItems = menu;

  useEffect(() => {
    if (pathname === '/map') {
      setSelectedMenu(MENU_BAR.map);
    }
    if (pathname === '/calendar') {
      setSelectedMenu(MENU_BAR.calendar);
    }
  }, [pathname, setSelectedMenu]);

  return (
    <div className='flex flex-col h-screen'>
      <Routes>
        {routeItems.map((item) => (
          <Route path={item.path} element={item.element} key={item.path} />
        ))}
      </Routes>
    </div>
  );
};
