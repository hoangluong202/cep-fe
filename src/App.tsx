import { AppLayout } from '@layouts';
import { LoginPage, CalendarPage, ViewMapPage, HomePage } from '@pages';
import { MENU_BAR } from '@constants';

export default function App() {
  return (
    <AppLayout
      menu={[
        {
          type: 'item',
          path: '/login',
          name: 'Login',
          element: <LoginPage />
        },
        {
          type: 'item',
          path: '/',
          name: 'Home',
          element: <HomePage />
        },
        {
          type: 'item',
          path: '/map',
          name: MENU_BAR.map,
          element: <ViewMapPage />
        },
        {
          type: 'item',
          path: '/calendar',
          name: MENU_BAR.calendar,
          element: <CalendarPage />
        }
      ]}
    />
  );
}
