import { Layout } from '@layouts';
import {
  CalendarPage,
  MapPage,
  DashboardPage,
  TemplatePage,
  AlarmPage,
  LoginPage,
  PolePage
} from '@pages';
import { MENU_ITEMS } from '@constants';

export default function App() {
  return (
    <Layout
      menu={[
        {
          type: 'menu-item',
          path: '/dashboard',
          name: MENU_ITEMS.find((item) => item.key === 'dashboard')?.label ?? '',
          element: <DashboardPage />
        },
        {
          type: 'menu-item',
          path: '/map',
          name: MENU_ITEMS.find((item) => item.key === 'map')?.label ?? '',
          element: <MapPage />
        },
        {
          type: 'menu-item',
          path: '/calendar',
          name: MENU_ITEMS.find((item) => item.key === 'calendar')?.label ?? '',
          element: <CalendarPage />
        },
        {
          type: 'menu-item',
          path: '/alarm',
          name: MENU_ITEMS.find((item) => item.key === 'alarm')?.label ?? '',
          element: <AlarmPage />
        },
        {
          type: 'menu-item',
          path: '/pole',
          name: MENU_ITEMS.find((item) => item.key === 'pole')?.label ?? '',
          element: <PolePage />
        },
        {
          type: 'sub-menu-item',
          path: '/template',
          name: 'Template',
          element: <TemplatePage />
        },
        {
          type: 'auth-item',
          path: '/login',
          name: 'Login',
          element: <LoginPage />
        }
      ]}
    />
  );
}
