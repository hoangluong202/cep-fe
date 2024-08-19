import { AppLayout } from '@layouts';
import { CalendarPage, MapPage, DashboardPage } from '@pages';
import { MENU_BAR_NAME } from '@constants';

export default function App() {
  return (
    <AppLayout
      menu={[
        {
          type: 'menu-item',
          path: '/dashboard',
          name: MENU_BAR_NAME.dashboard,
          element: <DashboardPage />
        },
        {
          type: 'menu-item',
          path: '/map',
          name: MENU_BAR_NAME.map,
          element: <MapPage />
        },
        {
          type: 'menu-item',
          path: '/calendar',
          name: MENU_BAR_NAME.calendar,
          element: <CalendarPage />
        }
      ]}
    />
  );
}
