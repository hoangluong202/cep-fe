type RouteItem = {
  name: string;
  type: 'item';
  path: string;
  element: React.ReactElement;
};

type RouteSkeleton = {
  name: string;
  type: 'skeleton';
  path: string;
  element: React.ReactElement;
};

type RouteMenuItem = RouteItem | RouteSkeleton;

type RouteMenu = RouteMenuItem[];
