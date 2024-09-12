type RouteItem = {
  name: string;
  type: 'auth-item' | 'menu-item' | 'sub-menu-item';
  path: string;
  element: React.ReactElement;
};

type RouteMenu = RouteItem[];
